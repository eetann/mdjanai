import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFilePromise = promisify(execFile);

export async function copyToClipboard(
	html: string,
	plainText: string,
): Promise<void> {
	// Detect platform
	if (process.platform !== "darwin") {
		throw new Error(
			`Unsupported platform: ${process.platform}. Currently only macOS is supported.`,
		);
	}

	// macOS: Set both HTML and plain text with osascript
	// Encode HTML in hexadecimal
	const htmlHex = Buffer.from(html, "utf-8").toString("hex");
	const escapedText = plainText
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\n/g, "\\n");
	const script = `set the clipboard to {«class HTML»:«data HTML${htmlHex}», string:"${escapedText}"}`;
	await execFilePromise("osascript", ["-e", script]);
}
