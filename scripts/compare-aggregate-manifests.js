#!/usr/bin/env node

/**
 * Compare published @waysnx/ui-kit manifest with locally packed manifest
 * 
 * This confirms whether aggregate package dependency changes require publication.
 * 
 * Exit codes:
 *   0 - No differences (or no published version to compare)
 *   1 - Differences detected (expected when dependencies updated)
 *   2 - Execution error (npm fetch failed, pack failed, etc.)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Aggregate Package Manifest Comparison ===\n');

// Read local package version first
const uiKitMetaDir = path.join(__dirname, '..', 'packages', 'ui-kit-meta');
const pkgPath = path.join(uiKitMetaDir, 'package.json');
const currentPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = currentPkg.version;

// Determine baseline version to compare against (previous patch version)
const versionParts = currentVersion.split('.');
const patchNum = parseInt(versionParts[2], 10);
const baselineVersion = patchNum > 1 
  ? `${versionParts[0]}.${versionParts[1]}.${patchNum - 1}`
  : currentVersion;

// Get published manifest from npm
console.log(`1. Fetching published @waysnx/ui-kit@${baselineVersion} from npm...\n`);
let publishedDeps;
try {
  const npmOutput = execSync(`npm view @waysnx/ui-kit@${baselineVersion} dependencies --json`, {
    encoding: 'utf8'
  });
  publishedDeps = JSON.parse(npmOutput);
  console.log(`Published @waysnx/ui-kit@${baselineVersion} dependencies:`);
  for (const [name, version] of Object.entries(publishedDeps)) {
    console.log(`  ${name}: ${version}`);
  }
} catch (error) {
  if (error.message.includes('E404')) {
    console.log(`Note: @waysnx/ui-kit@${baselineVersion} not found on npm (this is the first release).`);
    console.log('Skipping comparison with published version.\n');
    publishedDeps = {};
  } else {
    console.error('Failed to fetch from npm:', error.message);
    process.exit(2);
  }
}

// Pack local and get manifest
console.log('\n2. Packing local @waysnx/ui-kit...\n');
let localDeps;

try {
  execSync('pnpm pack', { cwd: uiKitMetaDir, encoding: 'utf8' });
  
  const tarballName = `waysnx-ui-kit-${currentVersion}.tgz`;
  const extractCmd = process.platform === 'win32'
    ? `tar -xOf ${tarballName} package/package.json`
    : `tar -xOf ${tarballName} package/package.json`;
  
  const manifestJson = execSync(extractCmd, {
    cwd: uiKitMetaDir,
    encoding: 'utf8'
  });
  
  const manifest = JSON.parse(manifestJson);
  localDeps = manifest.dependencies || {};
  
  console.log(`Local packed @waysnx/ui-kit@${currentVersion} dependencies:`);
  for (const [name, version] of Object.entries(localDeps)) {
    console.log(`  ${name}: ${version}`);
  }
  
  // Clean up tarball
  execSync(
    process.platform === 'win32' ? `del ${tarballName}` : `rm ${tarballName}`,
    { cwd: uiKitMetaDir }
  );
} catch (error) {
  console.error('Failed to pack local:', error.message);
  process.exit(2);
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
  console.log(`This means the existing @waysnx/ui-kit@${baselineVersion} on npm will NOT`);
  console.log(`automatically resolve to the updated dependency versions.\n`);
  console.log(`Recommendation: Version ${currentVersion} should be published\n`);
  console.log('Rationale:');
  console.log(`- Published ui-kit@${baselineVersion} has pinned dependencies in tarball`);
  console.log(`- npm install @waysnx/ui-kit@${baselineVersion} will get the old dependency versions`);
  console.log(`- Publishing ui-kit@${currentVersion} with updated dependencies is required`);
  console.log(`- Consumers can then upgrade to ui-kit@${currentVersion} to get the fix`);
  // Exit 1 indicates difference detected (expected condition, not an error)
  process.exit(1);
} else {
  console.log('✓ No differences found.');
  console.log('Published and local manifests are identical.');
  if (Object.keys(publishedDeps).length === 0) {
    console.log('(No published version to compare against)');
  }
  process.exit(0);
}
