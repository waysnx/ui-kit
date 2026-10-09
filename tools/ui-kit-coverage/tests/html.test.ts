/**
 * HTML report generation tests.
 * 
 * Verifies:
 * - HTML generation works correctly
 * - Security utilities prevent XSS
 * - Data consistency with CoverageReport
 * - Edge cases are handled properly
 */

import { describe, it, expect, beforeEach } from "vitest";
import { promises as fs } from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { writeHtmlReport } from "../src/reports/html/index.js";
import { escapeHtml, safeJsonSerialize, escapeAttribute } from "../src/reports/html/utils.js";
import type { CoverageReport } from "../src/types/index.js";

// ============================================================================
// Test Utilities
// ============================================================================

function createMinimalReport(): CoverageReport {
  return {
    schemaVersion: "0.1",
    analyzerVersion: "0.2.0",
    project: {
      name: "test-project",
      root: ".",
      language: ["typescript"],
    },
    files: {
      scanned: 10,
      supported: 8,
      ignored: 2,
    },
    summary: {
      waysnxPackagesDetected: 3,
      uiKitComponentsDetected: 12,
      nativeElementsDetected: 5,
      customComponentsDetected: 2,
    },
    packages: [
      {
        name: "@waysnx/ui-core",
        declared: true,
        imported: true,
        used: true,
        importedButUnused: false,
        referencedButNotInstalled: false,
        componentsDetected: 5,
      },
    ],
    components: [
      {
        component: "Button",
        package: "@waysnx/ui-core",
        importFiles: 3,
        jsxUsages: 10,
        files: ["src/App.tsx", "src/components/Header.tsx"],
        locations: [
          { file: "src/App.tsx", line: 10, column: 5 },
        ],
      },
    ],
    nativeUi: [
      {
        element: "div",
        count: 20,
        files: ["src/App.tsx", "src/components/Layout.tsx"],
      },
    ],
    customComponents: [
      {
        component: "CustomButton",
        usages: 5,
        files: ["src/App.tsx"],
        wrapsUiKit: true,
      },
    ],
    replacementCandidates: [
      {
        source: "button",
        sourceKind: "native",
        candidate: "@waysnx/ui-core/Button",
        package: "@waysnx/ui-core",
        confidence: "HIGH",
        occurrences: 8,
        files: ["src/App.tsx"],
        evidence: {
          observedFact: {
            kind: "native-element",
            value: "button",
            reason: "native element listed as catalog alternative",
          },
          catalogEntry: {
            name: "Button",
            package: "@waysnx/ui-core",
            export: "Button",
            catalogConfidence: "HIGH",
            matchBasis: "native-alternative",
          },
        },
      },
    ],
    limitations: [
      {
        code: "test-limitation",
        message: "This is a test limitation",
        location: { file: "test.ts", line: 1, column: 1 },
      },
    ],
  };
}

async function readHtmlFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, "utf8");
}

// ============================================================================
// Security Utility Tests
// ============================================================================

describe("HTML Security Utilities", () => {
  describe("escapeHtml", () => {
    it("escapes < character", () => {
      expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
    });

    it("escapes > character", () => {
      expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
    });

    it("escapes & character", () => {
      expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
    });

    it("escapes double quotes", () => {
      expect(escapeHtml('Hello "World"')).toBe("Hello &quot;World&quot;");
    });

    it("escapes single quotes", () => {
      expect(escapeHtml("It's working")).toBe("It&#039;s working");
    });

    it("prevents script tag injection", () => {
      const malicious = '<script>alert("xss")</script>';
      const escaped = escapeHtml(malicious);
      expect(escaped).not.toContain("<script>");
      expect(escaped).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    });

    it("handles empty string", () => {
      expect(escapeHtml("")).toBe("");
    });

    it("handles string with no special characters", () => {
      expect(escapeHtml("Hello World")).toBe("Hello World");
    });

    it("handles multiple special characters", () => {
      const input = '<div class="test">Hello & "Goodbye"</div>';
      const output = escapeHtml(input);
      expect(output).not.toContain("<");
      expect(output).not.toContain(">");
      expect(output).not.toContain('"');
      expect(output).toContain("&lt;");
      expect(output).toContain("&gt;");
      expect(output).toContain("&quot;");
    });
  });

  describe("safeJsonSerialize", () => {
    it("serializes valid JSON object", () => {
      const data = { name: "test", value: 123 };
      const result = safeJsonSerialize(data);
      expect(result).toBe('{"name":"test","value":123}');
    });

    it("escapes < character", () => {
      const data = { html: "<div>" };
      const result = safeJsonSerialize(data);
      expect(result).toContain("\\u003c");
      expect(result).not.toContain("<div>");
    });

    it("escapes > character", () => {
      const data = { html: "</div>" };
      const result = safeJsonSerialize(data);
      expect(result).toContain("\\u003e");
      expect(result).not.toContain("</div>");
    });

    it("prevents </script> injection", () => {
      const data = { xss: '</script><script>alert("xss")</script>' };
      const result = safeJsonSerialize(data);
      expect(result).not.toContain("</script>");
      expect(result).toContain("\\u003c");
      expect(result).toContain("\\u003e");
    });

    it("escapes & character", () => {
      const data = { text: "Tom & Jerry" };
      const result = safeJsonSerialize(data);
      expect(result).toContain("\\u0026");
    });

    it("handles line separator (U+2028)", () => {
      const data = { text: "Line\u2028Separator" };
      const result = safeJsonSerialize(data);
      expect(result).toContain("\\u2028");
    });

    it("handles paragraph separator (U+2029)", () => {
      const data = { text: "Paragraph\u2029Separator" };
      const result = safeJsonSerialize(data);
      expect(result).toContain("\\u2029");
    });

    it("handles nested objects", () => {
      const data = {
        outer: {
          inner: {
            value: "</script>",
          },
        },
      };
      const result = safeJsonSerialize(data);
      expect(result).not.toContain("</script>");
      const parsed = JSON.parse(result);
      expect(parsed.outer.inner.value).toBe("</script>");
    });

    it("handles arrays", () => {
      const data = ["<script>", "</script>", "normal"];
      const result = safeJsonSerialize(data);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("</script>");
    });
  });

  describe("escapeAttribute", () => {
    it("escapes double quotes", () => {
      expect(escapeAttribute('value="test"')).toContain("&quot;");
    });

    it("escapes single quotes", () => {
      expect(escapeAttribute("value='test'")).toContain("&#039;");
    });

    it("escapes ampersand", () => {
      expect(escapeAttribute("Tom & Jerry")).toContain("&amp;");
    });

    it("escapes < and >", () => {
      const result = escapeAttribute("<div>");
      expect(result).toContain("&lt;");
      expect(result).toContain("&gt;");
    });
  });
});

// ============================================================================
// HTML Generation Tests
// ============================================================================

describe("HTML Report Generation", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "coverage-test-"));
  });

  it("generates coverage.html file", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);

    expect(filePath).toBe(path.join(tempDir, "coverage.html"));
    
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it("HTML file is not empty", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    const content = await readHtmlFile(filePath);
    expect(content.length).toBeGreaterThan(0);
  });

  it("HTML contains DOCTYPE declaration", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    const content = await readHtmlFile(filePath);
    expect(content).toContain("<!DOCTYPE html>");
  });

  it("HTML contains proper structure (html, head, body)", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    const content = await readHtmlFile(filePath);
    expect(content).toContain("<html");
    expect(content).toContain("<head>");
    expect(content).toContain("<body>");
    expect(content).toContain("</html>");
  });

  it("HTML contains inline CSS (self-contained)", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    const content = await readHtmlFile(filePath);
    expect(content).toContain("<style>");
    expect(content).toContain("</style>");
    // Should not reference external stylesheets
    expect(content).not.toContain('<link rel="stylesheet"');
  });

  it("HTML contains inline JavaScript (self-contained)", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    const content = await readHtmlFile(filePath);
    expect(content).toContain("<script>");
    expect(content).toContain("</script>");
    // Should not reference external scripts (except inline)
    const scriptMatches = content.match(/<script[^>]*src=/g);
    expect(scriptMatches).toBeNull(); // No external scripts
  });

  it("HTML does not contain CDN links", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    const content = await readHtmlFile(filePath);
    expect(content).not.toContain("cdn.jsdelivr.net");
    expect(content).not.toContain("unpkg.com");
    expect(content).not.toContain("cdnjs.cloudflare.com");
  });
});

// ============================================================================
// Data Consistency Tests
// ============================================================================

describe("HTML Report Data Consistency", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "coverage-test-"));
  });

  it("contains project name from CoverageReport", async () => {
    const report = createMinimalReport();
    report.project.name = "my-unique-project-name";
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("my-unique-project-name");
  });

  it("contains analyzer version from CoverageReport", async () => {
    const report = createMinimalReport();
    report.analyzerVersion = "0.2.0";
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("0.2.0");
  });

  it("displays correct package count", async () => {
    const report = createMinimalReport();
    report.summary.waysnxPackagesDetected = 7;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should appear in KPI card
    expect(content).toMatch(/kpi-value[^>]*>7</);
  });

  it("displays correct component count", async () => {
    const report = createMinimalReport();
    report.summary.uiKitComponentsDetected = 42;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toMatch(/kpi-value[^>]*>42</);
  });

  it("displays correct native elements count", async () => {
    const report = createMinimalReport();
    report.summary.nativeElementsDetected = 15;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toMatch(/kpi-value[^>]*>15</);
  });

  it("displays correct custom components count", async () => {
    const report = createMinimalReport();
    report.summary.customComponentsDetected = 8;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toMatch(/kpi-value[^>]*>8</);
  });

  it("displays package names from packages array", async () => {
    const report = createMinimalReport();
    report.packages = [
      {
        name: "@waysnx/ui-unique-package",
        declared: true,
        imported: true,
        used: true,
        importedButUnused: false,
        referencedButNotInstalled: false,
        componentsDetected: 3,
      },
    ];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("@waysnx/ui-unique-package");
  });

  it("displays component names from components array", async () => {
    const report = createMinimalReport();
    report.components = [
      {
        component: "UniqueComponentName",
        package: "@waysnx/ui-core",
        importFiles: 1,
        jsxUsages: 5,
        files: ["test.tsx"],
        locations: [{ file: "test.tsx", line: 1, column: 1 }],
      },
    ];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("UniqueComponentName");
  });

  it("displays replacement candidate confidence levels", async () => {
    const report = createMinimalReport();
    report.replacementCandidates[0].confidence = "MEDIUM";
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("MEDIUM");
    expect(content).toContain("badge-medium");
  });

  it("embeds complete CoverageReport in script", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should contain embedded data
    expect(content).toContain("window.__COVERAGE_REPORT__");
    
    // Extract and parse embedded JSON
    const match = content.match(/window\.__COVERAGE_REPORT__\s*=\s*({.+?});/s);
    expect(match).toBeTruthy();
    
    if (match) {
      const embeddedDataStr = match[1];
      // Should be valid JSON (after unescaping)
      expect(() => JSON.parse(embeddedDataStr)).not.toThrow();
    }
  });

  it("displays file statistics", async () => {
    const report = createMinimalReport();
    report.files.scanned = 123;
    report.files.supported = 98;
    report.files.ignored = 25;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("123");
    expect(content).toContain("98");
    expect(content).toContain("25");
  });

  it("displays limitations", async () => {
    const report = createMinimalReport();
    report.limitations = [
      {
        code: "unique-test-code",
        message: "This is a unique test limitation message",
      },
    ];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("unique-test-code");
    expect(content).toContain("This is a unique test limitation message");
  });
});

// ============================================================================
// Edge Case Tests
// ============================================================================

describe("HTML Report Edge Cases", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "coverage-test-"));
  });

  it("handles report with 0 packages", async () => {
    const report = createMinimalReport();
    report.packages = [];
    report.summary.waysnxPackagesDetected = 0;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("No WaysNX UI Kit packages detected");
  });

  it("handles report with 0 components", async () => {
    const report = createMinimalReport();
    report.components = [];
    report.summary.uiKitComponentsDetected = 0;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("No UI Kit components detected");
  });

  it("handles report with 0 native elements", async () => {
    const report = createMinimalReport();
    report.nativeUi = [];
    report.summary.nativeElementsDetected = 0;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("No native HTML elements detected");
  });

  it("handles report with 0 custom components", async () => {
    const report = createMinimalReport();
    report.customComponents = [];
    report.summary.customComponentsDetected = 0;
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("No custom components detected");
  });

  it("handles report with 0 replacement candidates", async () => {
    const report = createMinimalReport();
    report.replacementCandidates = [];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("No replacement candidates identified");
  });

  it("handles report with no limitations", async () => {
    const report = createMinimalReport();
    report.limitations = [];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("No limitations reported");
  });

  it("handles component name with special characters", async () => {
    const report = createMinimalReport();
    report.components = [
      {
        component: '<Button & "Modal">',
        package: "@waysnx/ui-core",
        importFiles: 1,
        jsxUsages: 1,
        files: ["test.tsx"],
        locations: [{ file: "test.tsx", line: 1, column: 1 }],
      },
    ];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should be escaped
    expect(content).not.toContain('<Button & "Modal">');
    expect(content).toContain("&lt;Button");
    expect(content).toContain("&amp;");
    expect(content).toContain("&quot;");
  });

  it("handles project name with quotes", async () => {
    const report = createMinimalReport();
    report.project.name = 'Project "Alpha" & Beta';
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should be escaped in HTML
    expect(content).toContain("&quot;");
    expect(content).toContain("&amp;");
  });

  it("handles file path with special characters", async () => {
    const report = createMinimalReport();
    report.components[0].files = ['src/<special>/file & "name".tsx'];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should be escaped
    expect(content).toContain("&lt;");
    expect(content).toContain("&amp;");
    expect(content).toContain("&quot;");
  });

  it("handles large number of components (1000+)", async () => {
    const report = createMinimalReport();
    report.components = Array.from({ length: 1000 }, (_, i) => ({
      component: `Component${i}`,
      package: "@waysnx/ui-core",
      importFiles: 1,
      jsxUsages: 1,
      files: [`file${i}.tsx`],
      locations: [{ file: `file${i}.tsx`, line: 1, column: 1 }],
    }));
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should contain all components
    expect(content).toContain("Component0");
    expect(content).toContain("Component999");
    
    // File should be generated without errors
    expect(content.length).toBeGreaterThan(50000);
  });

  it("handles multiple languages", async () => {
    const report = createMinimalReport();
    report.project.language = ["typescript", "javascript", "tsx", "jsx"];
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain("typescript");
    expect(content).toContain("javascript");
  });

  it("handles empty project name (fallback)", async () => {
    const report = createMinimalReport();
    report.project.name = "";
    
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Should still generate valid HTML
    expect(content).toContain("<!DOCTYPE html>");
  });
});

// ============================================================================
// Integration Tests
// ============================================================================

describe("HTML Report Integration", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "coverage-test-"));
  });

  it("generates HTML that is consistent with JSON report data", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    // Verify all key metrics from report appear in HTML
    expect(content).toContain(String(report.summary.waysnxPackagesDetected));
    expect(content).toContain(String(report.summary.uiKitComponentsDetected));
    expect(content).toContain(String(report.summary.nativeElementsDetected));
    expect(content).toContain(String(report.summary.customComponentsDetected));
    expect(content).toContain(report.project.name);
    expect(content).toContain(report.analyzerVersion);
  });

  it("HTML file is readable as UTF-8", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    
    // Should not throw when reading as UTF-8
    const content = await fs.readFile(filePath, "utf8");
    expect(content).toBeTruthy();
  });

  it("HTML contains charset declaration", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain('charset="UTF-8"');
  });

  it("HTML contains viewport meta tag (responsive)", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toContain('name="viewport"');
    expect(content).toContain('width=device-width');
  });

  it("HTML contains title tag", async () => {
    const report = createMinimalReport();
    const filePath = await writeHtmlReport(tempDir, report);
    const content = await readHtmlFile(filePath);
    
    expect(content).toMatch(/<title>.*UI Kit Coverage Report.*<\/title>/);
  });
});
