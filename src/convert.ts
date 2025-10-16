import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
	const result = await unified()
		.use(remarkParse)
		.use(remarkHtml)
		.process(markdown);
	return String(result);
}
