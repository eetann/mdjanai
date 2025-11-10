import { expect, test } from "bun:test";
import { convertMarkdownToHtml } from "../src/convert";

test("正常系_基本的なMarkdown要素の変換", async () => {
	const markdown = "**test**";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<strong>test</strong>");
});

test("正常系_リスト項目の変換", async () => {
	const markdown = "- item1\n- item2";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<ul>");
	expect(result).toContain("<li>item1</li>");
	expect(result).toContain("<li>item2</li>");
});

test("正常系_コードブロックの変換", async () => {
	const markdown = "```\nconst x = 1;\n```";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toContain("<pre>");
	expect(result).toContain("<code>");
	expect(result).toContain("const x = 1;");
});

test("エッジケース_空文字列の変換", async () => {
	const markdown = "";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("");
});

test("エッジケース_特殊文字を含むMarkdown", async () => {
	const markdown = "< > & \" '";
	const result = await convertMarkdownToHtml(markdown);
	// HTMLエンティティ(数値文字参照)にエスケープされていることを確認
	expect(result).toContain("&#x3C;"); // <
	expect(result).toContain("&#x26;"); // &
	// >はエスケープされない場合もあるので、結果が含まれていることだけ確認
	expect(result).toContain(">");
});

test("converts h1 to strong element with # symbol preserved", async () => {
	const markdown = "# foo";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong># foo</strong>\n");
});

test("converts h2 to strong element with ## symbols preserved", async () => {
	const markdown = "## bar";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong>## bar</strong>\n");
});

test("converts h3 to strong element with ### symbols preserved", async () => {
	const markdown = "### baz";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong>### baz</strong>\n");
});

test("converts h4 to strong element with #### symbols preserved", async () => {
	const markdown = "#### qux";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong>#### qux</strong>\n");
});

test("converts h5 to strong element with ##### symbols preserved", async () => {
	const markdown = "##### quux";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong>##### quux</strong>\n");
});

test("converts h6 to strong element with ###### symbols preserved", async () => {
	const markdown = "###### corge";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong>###### corge</strong>\n");
});

test("converts empty heading to strong with # symbol only", async () => {
	const markdown = "#";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong># </strong>\n");
});

test("converts heading with multiple child nodes (e.g., # **foo**)", async () => {
	const markdown = "# **bold** and *italic*";
	const result = await convertMarkdownToHtml(markdown);
	expect(result).toBe("<strong># bold and italic</strong>\n");
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
