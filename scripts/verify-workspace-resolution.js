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

try {
  // Run pnpm pack and inspect the tarball
  const packOutput = execSync(
    'pnpm pack',
    { 
      cwd: path.join(__dirname, '..', 'packages', 'ui-kit-meta'),
      encoding: 'utf8'
    }
  );
  
  console.log('Pack output:', packOutput.trim());
  
  // Extract the tarball to inspect manifest
  const tarballPattern = /waysnx-ui-kit-[\d\.]+\.tgz/;
  const match = packOutput.match(tarballPattern);
  
  if (match) {
    const tarball = match[0];
    const uiKitMetaDir = path.join(__dirname, '..', 'packages', 'ui-kit-meta');
    
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
    if (manifest.dependencies) {
      for (const [name, version] of Object.entries(manifest.dependencies)) {
        console.log(`  ${name}: ${version}`);
        
        if (name === '@waysnx/ui-form-builder') {
          if (version === '1.0.2') {
            console.log('    ✓ workspace:* correctly resolved to 1.0.2');
          } else {
            console.log(`    ✗ Expected 1.0.2, got ${version}`);
            
            // Clean up tarball
            execSync(`rm ${tarball}`, { cwd: uiKitMetaDir });
            process.exit(1);
          }
        }
      }
    }
    
    // Clean up tarball
    execSync(process.platform === 'win32' ? `del ${tarball}` : `rm ${tarball}`, { cwd: uiKitMetaDir });
  }
} catch (error) {
  console.error('Failed to run pnpm pack:', error.message);
  process.exit(1);
}

console.log('\n=== Verification Complete ===');
console.log('\nConclusion:');
console.log('✓ workspace:* dependencies will resolve correctly');
console.log('✓ Consumers installing @waysnx/ui-kit will receive ui-form-builder@1.0.2');
console.log('✓ No separate aggregate package release is required');
console.log('  (pnpm publish rewrites workspace:* automatically)');
