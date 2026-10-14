#!/usr/bin/env node

/**
 * Verify workspace:* dependency resolution for aggregate package
 * 
 * This script confirms that:
 * 1. @waysnx/ui-kit correctly depends on ui-form-builder via workspace:*
 * 2. pnpm will rewrite workspace:* to concrete versions on publish
 * 3. Consumers will receive the updated versions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Workspace Dependency Resolution Verification ===\n');

// Read ui-kit-meta (aggregate) package.json
const uiKitPath = path.join(__dirname, '..', 'packages', 'ui-kit-meta', 'package.json');
const uiKitPkg = JSON.parse(fs.readFileSync(uiKitPath, 'utf8'));

console.log(`@waysnx/ui-kit version: ${uiKitPkg.version}`);
console.log('\nAggregate package dependencies:');

const deps = uiKitPkg.dependencies || {};
for (const [name, version] of Object.entries(deps)) {
  console.log(`  ${name}: ${version}`);
  
  if (name === '@waysnx/ui-form-builder') {
    if (version === 'workspace:*') {
      console.log('    ✓ Uses workspace:* (will be rewritten to 1.0.2 on publish)');
    } else {
      console.log(`    ⚠ Pinned to ${version} instead of workspace:*`);
    }
  }
}

// Read actual ui-form-builder version
const formBuilderPath = path.join(__dirname, '..', 'packages', 'ui-form-builder', 'package.json');
const formBuilderPkg = JSON.parse(fs.readFileSync(formBuilderPath, 'utf8'));

console.log(`\n@waysnx/ui-form-builder actual version: ${formBuilderPkg.version}`);

// Test pnpm pack to see resolved versions
console.log('\n=== Testing pnpm pack resolution (ui-kit-meta) ===\n');

const uiKitMetaDir = path.join(__dirname, '..', 'packages', 'ui-kit-meta');
let tarball = null;
let exitCode = 0;

try {
  // List existing tarballs before pnpm pack
  const existingTarballs = fs.readdirSync(uiKitMetaDir)
    .filter(f => f.match(/waysnx-ui-kit-[\d\.]+\.tgz$/));
  
  // Run pnpm pack and inspect the tarball
  let packOutput;
  try {
    packOutput = execSync(
      'pnpm pack',
      { 
        cwd: uiKitMetaDir,
        encoding: 'utf8'
      }
    );
    console.log('Pack output:', packOutput.trim());
  } catch (packError) {
    console.error('✗ ERROR: pnpm pack failed:', packError.message);
    
    // Check if tarball was created despite error
    const currentTarballs = fs.readdirSync(uiKitMetaDir)
      .filter(f => f.match(/waysnx-ui-kit-[\d\.]+\.tgz$/));
    const newTarballs = currentTarballs.filter(t => !existingTarballs.includes(t));
    
    if (newTarballs.length === 1) {
      tarball = newTarballs[0];
      console.log(`Found tarball created before error: ${tarball}`);
    }
    
    exitCode = 1;
    throw new Error('pnpm pack failed');
  }
  
  // Extract the tarball filename from output
  const tarballPattern = /waysnx-ui-kit-[\d\.]+\.tgz/;
  const match = packOutput.match(tarballPattern);
  
  if (!match) {
    console.warn('⚠ Warning: Could not parse tarball filename from pnpm pack output');
    
    // Find newly created tarball (not in existingTarballs list)
    const currentTarballs = fs.readdirSync(uiKitMetaDir)
      .filter(f => f.match(/waysnx-ui-kit-[\d\.]+\.tgz$/));
    const newTarballs = currentTarballs.filter(t => !existingTarballs.includes(t));
    
    if (newTarballs.length === 1) {
      tarball = newTarballs[0];
      console.log(`✓ Identified new tarball by directory listing: ${tarball}`);
      // Continue with manifest validation
    } else if (newTarballs.length > 1) {
      console.error(`✗ ERROR: Multiple new tarballs found: ${newTarballs.join(', ')}`);
      console.error('Cannot safely determine which to validate and clean up');
      exitCode = 1;
      throw new Error('Ambiguous tarball identification');
    } else {
      console.error('✗ ERROR: No new tarball found after pnpm pack');
      exitCode = 1;
      throw new Error('Tarball not created');
    }
  } else {
    tarball = match[0];
  }
  
  // Extract package.json from tarball
  const extractCmd = process.platform === 'win32'
    ? `tar -xOf ${tarball} package/package.json`
    : `tar -xOf ${tarball} package/package.json`;
  
  const manifestJson = execSync(extractCmd, {
    cwd: uiKitMetaDir,
    encoding: 'utf8'
  });
  
  const manifest = JSON.parse(manifestJson);
  
  console.log('\nResolved dependencies in packed tarball:');
  if (!manifest.dependencies) {
    console.error('✗ ERROR: Packed manifest has no dependencies');
    exitCode = 1;
    throw new Error('Manifest validation failed');
  }
  
  let formBuilderFound = false;
  
  for (const [name, version] of Object.entries(manifest.dependencies)) {
    console.log(`  ${name}: ${version}`);
    
    if (name === '@waysnx/ui-form-builder') {
      formBuilderFound = true;
      if (version === formBuilderPkg.version) {
        console.log(`    ✓ workspace:* correctly resolved to ${version}`);
      } else {
        console.error(`    ✗ Expected ${formBuilderPkg.version}, got ${version}`);
        exitCode = 1;
        throw new Error('Dependency version mismatch');
      }
    }
  }
  
  if (!formBuilderFound) {
    console.error('✗ ERROR: @waysnx/ui-form-builder not found in packed dependencies');
    exitCode = 1;
    throw new Error('Required dependency not found');
  }
  
} catch (error) {
  if (exitCode === 0) {
    // Unexpected error (not one of our validation failures)
    console.error('Failed to pack or inspect tarball:', error.message);
    exitCode = 1;
  }
} finally {
  // Always clean up tarball, even on error
  if (tarball) {
    const tarballPath = path.join(uiKitMetaDir, tarball);
    try {
      if (fs.existsSync(tarballPath)) {
        fs.unlinkSync(tarballPath);
      }
    } catch (cleanupError) {
      console.error(`✗ ERROR: Failed to clean up tarball ${tarball}: ${cleanupError.message}`);
      exitCode = 1; // Set non-zero exit code on cleanup failure
    }
  }
  
  // Exit with appropriate code after cleanup
  if (exitCode !== 0) {
    process.exit(exitCode);
  }
}

console.log('\n=== Verification Complete ===');
console.log('\nConclusion:');
console.log('✓ workspace:* dependencies resolve correctly');
console.log(`✓ Consumers installing @waysnx/ui-kit@${uiKitPkg.version} will receive ui-form-builder@${formBuilderPkg.version}`);
console.log('✓ Aggregate package must be published to distribute dependency updates');
console.log('  (pnpm publish rewrites workspace:* to concrete versions in the published tarball)');
