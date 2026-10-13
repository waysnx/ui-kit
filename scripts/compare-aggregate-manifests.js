#!/usr/bin/env node

/**
 * Compare published @waysnx/ui-kit manifest with locally packed manifest
 * 
 * This confirms whether aggregate package needs version bump
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Aggregate Package Manifest Comparison ===\n');

// Get published manifest from npm
console.log('1. Fetching published @waysnx/ui-kit@1.0.1 from npm...\n');
let publishedDeps;
try {
  const npmOutput = execSync('npm view @waysnx/ui-kit@1.0.1 dependencies --json', {
    encoding: 'utf8'
  });
  publishedDeps = JSON.parse(npmOutput);
  console.log('Published @waysnx/ui-kit@1.0.1 dependencies:');
  for (const [name, version] of Object.entries(publishedDeps)) {
    console.log(`  ${name}: ${version}`);
  }
} catch (error) {
  console.error('Failed to fetch from npm:', error.message);
  process.exit(1);
}

// Pack local and get manifest
console.log('\n2. Packing local @waysnx/ui-kit...\n');
const uiKitMetaDir = path.join(__dirname, '..', 'packages', 'ui-kit-meta');
let localDeps;

try {
  execSync('pnpm pack', { cwd: uiKitMetaDir, encoding: 'utf8' });
  
  const extractCmd = process.platform === 'win32'
    ? 'tar -xOf waysnx-ui-kit-1.0.1.tgz package/package.json'
    : 'tar -xOf waysnx-ui-kit-1.0.1.tgz package/package.json';
  
  const manifestJson = execSync(extractCmd, {
    cwd: uiKitMetaDir,
    encoding: 'utf8'
  });
  
  const manifest = JSON.parse(manifestJson);
  localDeps = manifest.dependencies || {};
  
  console.log('Local packed @waysnx/ui-kit@1.0.1 dependencies:');
  for (const [name, version] of Object.entries(localDeps)) {
    console.log(`  ${name}: ${version}`);
  }
  
  // Clean up tarball
  execSync(
    process.platform === 'win32' ? 'del waysnx-ui-kit-1.0.1.tgz' : 'rm waysnx-ui-kit-1.0.1.tgz',
    { cwd: uiKitMetaDir }
  );
} catch (error) {
  console.error('Failed to pack local:', error.message);
  process.exit(1);
}

// Compare
console.log('\n3. Comparing dependencies...\n');
let hasDifferences = false;

const allKeys = new Set([
  ...Object.keys(publishedDeps),
  ...Object.keys(localDeps)
]);

for (const key of allKeys) {
  const publishedVersion = publishedDeps[key];
  const localVersion = localDeps[key];
  
  if (publishedVersion !== localVersion) {
    console.log(`❌ DIFFERENCE: ${key}`);
    console.log(`   Published: ${publishedVersion || 'not present'}`);
    console.log(`   Local:     ${localVersion || 'not present'}`);
    hasDifferences = true;
  } else {
    console.log(`✓ SAME: ${key} @ ${localVersion}`);
  }
}

console.log('\n=== Analysis ===\n');

if (hasDifferences) {
  console.log('⚠️  MANIFEST DIFFERENCE DETECTED\n');
  console.log('The local packed manifest differs from the published version.');
  console.log('This means the existing @waysnx/ui-kit@1.0.1 on npm will NOT');
  console.log('automatically resolve to ui-form-builder@1.0.2.\n');
  console.log('Recommendation: BUMP @waysnx/ui-kit to 1.0.2\n');
  console.log('Rationale:');
  console.log('- Published ui-kit@1.0.1 has pinned dependencies in tarball');
  console.log('- npm install @waysnx/ui-kit@1.0.1 will get ui-form-builder@1.0.1');
  console.log('- Publishing ui-kit@1.0.2 with updated dependency is required');
  console.log('- Consumers can then upgrade to ui-kit@1.0.2 to get the fix');
  process.exit(1);
} else {
  console.log('✓ No differences found.');
  console.log('Published and local manifests are identical.');
  console.log('No aggregate package update needed.');
  process.exit(0);
}
