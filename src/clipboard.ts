import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFilePromise = promisify(execFile);

export async function copyToClipboard(
	html: string,
	plainText: string,
): Promise<void> {
	// プラットフォーム検出
	if (process.platform !== "darwin") {
		throw new Error(
			`Unsupported platform: ${process.platform}. Currently only macOS is supported.`,
		);
	}

	// macOS: osascriptでHTMLとプレーンテキストの両方をセット
	// HTMLは16進数にエンコード
	const htmlHex = Buffer.from(html, "utf-8").toString("hex");
	const escapedText = plainText
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\n/g, "\\n");
	const script = `set the clipboard to {«class HTML»:«data HTML${htmlHex}», string:"${escapedText}"}`;
	await execFilePromise("osascript", ["-e", script]);
}
