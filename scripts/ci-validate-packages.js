#!/usr/bin/env node

/**
 * WaysNX UI Kit Package Metadata Validation
 *
 * Release-critical validation for Phase 1 (1.0.1 release gate).
 *
 * Validates:
 * - Exactly 19 publishable packages are present
 * - All packages are version 1.0.1 (1.0 release gate requirement)
 * - No publishable package is marked private
 * - Package names follow @waysnx/* convention
 * - package.json files are valid JSON
 * - No hardcoded npm auth tokens in package.json
 * - workspace:* dependencies are resolvable to known packages
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

// Exactly 19 publishable packages (1.0 release baseline)
const PUBLISHABLE_PACKAGES = new Set([
  '@waysnx/ui-accessibility',
  '@waysnx/ui-communication',
  '@waysnx/ui-core',
  '@waysnx/ui-dashboard',
  '@waysnx/ui-data',
  '@waysnx/ui-diagnostics',
  '@waysnx/ui-docs',
  '@waysnx/ui-feedback',
  '@waysnx/ui-files',
  '@waysnx/ui-form-builder',
  '@waysnx/ui-grid-builder',
  '@waysnx/ui-i18n',
  '@waysnx/ui-kit',          // aggregate (ui-kit-meta directory)
  '@waysnx/ui-layout',
  '@waysnx/ui-maps',
  '@waysnx/ui-media',
  '@waysnx/ui-navigation',
  '@waysnx/ui-security',
  '@waysnx/ui-visualization',
]);

// Directory mappings: handle special case where @waysnx/ui-kit is in ui-kit-meta directory
const PACKAGE_DIR_MAP = {
  '@waysnx/ui-kit': 'ui-kit-meta',
};

let exitCode = 0;

function log(msg) {
  console.log(msg);
}

function error(msg) {
  console.error(`✗ ${msg}`);
  exitCode = 1;
}

function success(msg) {
  console.log(`✓ ${msg}`);
}

function readPackageJson(dir) {
  const pkgPath = path.join(dir, 'package.json');
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    error(`Failed to parse ${pkgPath}: ${e.message}`);
    return null;
  }
}

function getPackageDir(pkgName) {
  // Use mapping if available, otherwise normalize @waysnx/ui-* to ui-*
  if (PACKAGE_DIR_MAP[pkgName]) {
    return PACKAGE_DIR_MAP[pkgName];
  }
  return pkgName.replace('@waysnx/', '');
}

function validatePackageJson(pkg, pkgName, dir) {
  log(`\n  Validating ${pkgName}...`);

  // Check version is 1.0.1 (release gate requirement)
  if (pkg.version !== '1.0.1') {
    error(`    ${pkgName}: version is ${pkg.version}, expected 1.0.1 (release gate)`);
  } else {
    success(`    version: 1.0.1 (release gate)`);
  }

  // Check not marked private
  if (pkg.private === true) {
    error(`    ${pkgName}: marked as private but is in publishable set`);
  } else {
    success(`    not private`);
  }

  // Check package.json is valid JSON
  success(`    package.json is valid JSON`);

  // Check no hardcoded npm auth tokens
  const pkgJsonContent = fs.readFileSync(path.join(dir, 'package.json'), 'utf8');
  if (pkgJsonContent.match(/npm_token|NPM_TOKEN|authorization.*Bearer/i)) {
    error(`    ${pkgName}: contains potential auth token`);
  } else {
    success(`    no hardcoded auth tokens`);
  }

  // Check workspace:* dependencies are resolvable
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };

  let hasWorkspaceDeps = false;
  for (const [depName, depVersion] of Object.entries(allDeps)) {
    if (depVersion.startsWith('workspace:')) {
      hasWorkspaceDeps = true;
      if (!PUBLISHABLE_PACKAGES.has(depName)) {
        error(`    ${pkgName}: workspace dependency ${depName} not found in publishable set`);
      }
    }
  }

  if (hasWorkspaceDeps) {
    success(`    workspace dependencies resolvable`);
  }
}

// Main validation
log('=== Package Metadata Validation ===');
log(`\nExpected: ${PUBLISHABLE_PACKAGES.size} publishable packages at version 1.0.1`);
log(`Validating...\n`);

let foundCount = 0;
for (const pkgName of PUBLISHABLE_PACKAGES) {
  const dirName = getPackageDir(pkgName);
  const dirPath = path.join(PACKAGES_DIR, dirName);

  if (!fs.existsSync(dirPath)) {
    error(`Package directory not found: ${dirPath} (for ${pkgName})`);
    continue;
  }

  foundCount++;
  const pkgJson = readPackageJson(dirPath);
  if (!pkgJson) continue;

  if (pkgJson.name !== pkgName) {
    error(`  ${dirPath}: package.json name is ${pkgJson.name}, expected ${pkgName}`);
  }

  validatePackageJson(pkgJson, pkgName, dirPath);
}

log('\n=== Package Validation Complete ===');
log(`Found ${foundCount}/${PUBLISHABLE_PACKAGES.size} packages`);

if (foundCount !== PUBLISHABLE_PACKAGES.size) {
  error(`Expected exactly ${PUBLISHABLE_PACKAGES.size} packages, found ${foundCount}`);
}

if (exitCode === 0) {
  success(`All ${PUBLISHABLE_PACKAGES.size} packages valid for 1.0.1 release`);
} else {
  log('\n⚠ Package validation failed');
}

process.exit(exitCode);
