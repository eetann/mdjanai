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
