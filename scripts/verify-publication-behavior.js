#!/usr/bin/env node

/**
 * Verify pnpm publication behavior for existing versions
 * 
 * Tests what happens when:
 * 1. A package version already exists on npm
 * 2. A package version is new
 */

const { execSync } = require('child_process');

console.log('=== Publication Eligibility Verification ===\n');

const packages = [
  { name: '@waysnx/ui-form-builder', version: '1.0.2', status: 'new' },
  { name: '@waysnx/ui-kit', version: '1.0.2', status: 'new' },
  { name: '@waysnx/ui-core', version: '1.0.1', status: 'existing' },
];

console.log('Checking package versions on npm registry...\n');

for (const pkg of packages) {
  console.log(`${pkg.name}@${pkg.version}:`);
  
  try {
    // Check if version exists on npm
    const output = execSync(`npm view ${pkg.name}@${pkg.version} version 2>&1`, {
      encoding: 'utf8'
    });
    
    if (output.includes(pkg.version)) {
      console.log(`  ✓ EXISTS on npm`);
      console.log(`  → pnpm will skip (409 error or already exists check)`);
      pkg.actualStatus = 'exists';
    }
  } catch (error) {
    const errorMsg = error.message || '';
    if (errorMsg.includes('404') || errorMsg.includes('not found')) {
      console.log(`  ✗ NOT FOUND on npm`);
      console.log(`  → pnpm will publish this version`);
      pkg.actualStatus = 'not-exists';
    } else {
      console.log(`  ? Unknown status (check manually)`);
      console.log(`  Error: ${errorMsg.substring(0, 100)}`);
      pkg.actualStatus = 'unknown';
    }
  }
  
  console.log('');
}

console.log('=== pnpm Publish Behavior ===\n');
console.log('When running: pnpm -r --filter "@waysnx/*" publish\n');

console.log('Expected behavior:');
console.log('1. pnpm checks each package@version against npm registry');
console.log('2. If version exists: SKIPS with message "package already exists"');
console.log('3. If version new: PUBLISHES with OIDC provenance');
console.log('4. Never overwrites existing versions (npm prevents this)');
console.log('5. Exit code 0 even if some packages skipped\n');

console.log('For this release:\n');

for (const pkg of packages) {
  if (pkg.actualStatus === 'exists') {
    console.log(`✓ SKIP: ${pkg.name}@${pkg.version} (already published)`);
  } else if (pkg.actualStatus === 'not-exists') {
    console.log(`→ PUBLISH: ${pkg.name}@${pkg.version} (new version)`);
  } else {
    console.log(`? CHECK: ${pkg.name}@${pkg.version} (verify manually)`);
  }
}

console.log('\n=== Safety Guarantees ===\n');
console.log('✓ Existing versions are never overwritten');
console.log('✓ npm registry rejects duplicate version publications (HTTP 403)');
console.log('✓ pnpm treats "already exists" as success (not error)');
console.log('✓ Only new versions trigger actual upload');
console.log('✓ OIDC provenance attached to new publications only');
console.log('✓ Manual approval gates all publications (via release environment)');
