/**
 * HTML report writer for @waysnx/ui-kit-coverage.
 * 
 * Generates a self-contained, interactive HTML report from a CoverageReport object.
 * The HTML includes inline CSS and JavaScript - no external dependencies or CDN required.
 * 
 * Usage:
 *   const filePath = await writeHtmlReport(outputDir, report);
 */

import { promises as fs } from "node:fs";
import * as path from "node:path";
import type { CoverageReport } from "../../types/index.js";
import { generateHtml } from "./template.js";

/**
 * Writes an HTML coverage report to disk.
 * 
 * Generates a complete, self-contained HTML file that can be opened in any browser
 * without requiring internet access or external dependencies.
 * 
 * @param outputDir - Absolute path to the output directory
 * @param report - The coverage report data (single source of truth)
 * @returns Absolute path to the generated coverage.html file
 * 
 * @throws If the output directory doesn't exist or isn't writable
 * 
 * @example
 * const report = await analyze(config);
 * const htmlPath = await writeHtmlReport('./output', report);
 * console.log(`HTML report: ${htmlPath}`);
 */
export async function writeHtmlReport(
  outputDir: string,
  report: CoverageReport,
): Promise<string> {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Generate HTML from report data
  // IMPORTANT: This function ONLY renders data from CoverageReport.
  // It does NOT perform any analysis or calculate any metrics.
  // CoverageReport is the single source of truth.
  const html = generateHtml(report);
  
  // Write to file
  const filePath = path.join(outputDir, "coverage.html");
  await fs.writeFile(filePath, html, "utf8");
  
  return filePath;
}
