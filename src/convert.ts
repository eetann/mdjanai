import remarkBreaks from "remark-breaks";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { remarkSlackHeading } from "./remark-slack-heading";

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
	const result = await unified()
		.use(remarkParse)
		.use(remarkBreaks)
		.use(remarkSlackHeading)
		.use(remarkHtml)
		.process(markdown);
	return String(result);
}
