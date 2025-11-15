import { cli } from "gunshi";
import * as pkg from "../package.json";
import { copyToClipboard } from "./clipboard";
import { convertMarkdownToHtml } from "./convert";
import { getInput } from "./input";

const argv = process.argv.slice(2);

await cli(
	argv,
	{
		name: "mdjanai",
		description: "Convert Markdown to Slack-compatible rich text format",
		args: {
			file: {
				short: "f",
				description: "Path to markdown file",
				type: "string",
			},
		},
		async run(ctx) {
			try {
				// 1. Get input
				const input = await getInput(ctx);

				// 2. Convert Markdown to HTML
				const html = await convertMarkdownToHtml(input);

				// 3. Copy to clipboard (errors are warnings only)
				try {
					await copyToClipboard(html, input);
					console.error("✓ Copied to clipboard");
				} catch (clipboardError: unknown) {
					const message =
						clipboardError instanceof Error
							? clipboardError.message
							: String(clipboardError);
					console.error(`Warning: Failed to copy to clipboard: ${message}`);
				}

				// 4. Output to stdout
				console.log(html);
			} catch (error: unknown) {
				const message = error instanceof Error ? error.message : String(error);
				console.error(`Error: ${message}`);
				process.exit(1);
			}
		},
	},
	{
		version: pkg.version || "0.0.0",
	},
);
