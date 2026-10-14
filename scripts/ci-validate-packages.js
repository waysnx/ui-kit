#!/usr/bin/env node

/**
 * WaysNX UI Kit Package Metadata Validation
 *
 * Release-critical validation.
 *
 * Validates:
 * - Exactly 19 publishable packages are present
 * - All packages follow semantic versioning (1.x.x format)
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

// Expected versions for packages (allows different versions per package)
const EXPECTED_VERSIONS = {
  '@waysnx/ui-form-builder': '1.0.2',  // Bug fix release
  '@waysnx/ui-kit': '1.0.2',           // Aggregate updated to include form-builder fix
  // All others default to 1.0.1
};

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

  // Get expected version for this package (default to 1.0.1)
  const expectedVersion = EXPECTED_VERSIONS[pkgName] || '1.0.1';

  // Check version matches expected
  if (pkg.version !== expectedVersion) {
    error(`    ${pkgName}: version is ${pkg.version}, expected ${expectedVersion}`);
  } else {
    success(`    version: ${pkg.version}`);
  }

  // Validate version follows semantic versioning (1.x.x format)
  if (!/^1\.\d+\.\d+$/.test(pkg.version)) {
    error(`    ${pkgName}: version ${pkg.version} does not follow semantic versioning (1.x.x)`);
  } else {
    success(`    follows semantic versioning`);
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
log(`\nExpected: ${PUBLISHABLE_PACKAGES.size} publishable packages`);
log(`Package versions:`);
for (const [pkgName, version] of Object.entries(EXPECTED_VERSIONS)) {
  log(`  ${pkgName}: ${version}`);
}
log(`  All others: 1.0.1 (default)`);
log(`\nValidating...\n`);

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
  success(`All ${PUBLISHABLE_PACKAGES.size} packages valid and versions correct`);
} else {
  log('\n⚠ Package validation failed');
}

process.exit(exitCode);
