import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

const execFilePromise = promisify(execFile);

interface Context {
	values?: Record<string, unknown>;
	positionals?: string[];
	_: string[];
}

export async function getInput(ctx: Context): Promise<string> {
	// --file オプション指定時
	if (ctx.values?.file && typeof ctx.values.file === "string") {
		const content = await readFile(ctx.values.file, "utf-8");
		return content;
	}

	// 位置引数がある場合（positionals を優先、なければ _ を使用）
	const positionals = ctx.positionals || ctx._;
	if (positionals.length > 0) {
		return positionals.join(" ");
	}

	// クリップボードから読み込み（macOSのみ）
	if (process.platform === "darwin") {
		try {
			const { stdout } = await execFilePromise("pbpaste", []);
			return stdout;
		} catch (_error) {
			throw new Error("Failed to read from clipboard");
		}
	}

	throw new Error(
		"No input provided. Please provide input via file, argument, or clipboard.",
	);
}
