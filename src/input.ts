import { readFile } from "node:fs/promises";

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

	throw new Error("No input provided");
}
