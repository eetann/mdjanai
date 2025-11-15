import { expect, test } from "bun:test";
import { convertMarkdownToHtml } from "../src/convert";

test("converts basic Markdown elements", async () => {
	const markdown = "**test**";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<strong>test</strong>");
});

test("converts list items", async () => {
	const markdown = "- item1\n- item2";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<ul>");
	expect(result).toContain("<li>item1</li>");
	expect(result).toContain("<li>item2</li>");
});

test("converts code blocks", async () => {
	const markdown = "```\nconst x = 1;\n```";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<pre>");
	expect(result).toContain("<code>");
	expect(result).toContain("const x = 1;");
});

test("converts empty string", async () => {
	const markdown = "";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("");
});

test("converts Markdown with special characters", async () => {
	const markdown = "< > & \" '";
	const result = await convertMarkdownToHtml(markdown);
	// Verify that HTML entities (numeric character references) are escaped
	expect(result).toContain("&#x3C;"); // <
	expect(result).toContain("&#x26;"); // &
	// > may not be escaped in some cases, so just verify it's included in the result
	expect(result).toContain(">");
});

test("converts h1 to strong element with # symbol preserved", async () => {
	const markdown = "# foo";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong># foo</strong></p>\n");
});

test("converts h2 to strong element with ## symbols preserved", async () => {
	const markdown = "## bar";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong>## bar</strong></p>\n");
});

test("converts h3 to strong element with ### symbols preserved", async () => {
	const markdown = "### baz";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong>### baz</strong></p>\n");
});

test("converts h4 to strong element with #### symbols preserved", async () => {
	const markdown = "#### qux";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong>#### qux</strong></p>\n");
});

test("converts h5 to strong element with ##### symbols preserved", async () => {
	const markdown = "##### quux";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong>##### quux</strong></p>\n");
});

test("converts h6 to strong element with ###### symbols preserved", async () => {
	const markdown = "###### corge";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong>###### corge</strong></p>\n");
});

test("converts empty heading to strong with # symbol only", async () => {
	const markdown = "#";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong># </strong></p>\n");
});

test("converts heading with multiple child nodes (e.g., # **foo**)", async () => {
	const markdown = "# **bold** and *italic*";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong># bold and italic</strong></p>\n");
});

test("converts markdown with mixed elements including headings", async () => {
	const markdown = `# Title
- item1
- item2

## Subtitle

**bold text**`;
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<strong># Title</strong>");
	expect(result).toContain("<strong>## Subtitle</strong>");
	expect(result).toContain("<ul>");
	expect(result).toContain("<li>item1</li>");
	expect(result).toContain("<li>item2</li>");
	expect(result).toContain("<strong>bold text</strong>");
});

test("adds newline after heading followed by paragraph", async () => {
	const markdown = "# foo\nbar";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong># foo</strong></p>\n<p>bar</p>\n");
});

test("adds newline after each consecutive heading", async () => {
	const markdown = "# foo\n## bar";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe(
		"<p><strong># foo</strong></p>\n<p><strong>## bar</strong></p>\n",
	);
});

test("adds newline after heading at the end of document", async () => {
	const markdown = "# foo";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<p><strong># foo</strong></p>\n");
});
