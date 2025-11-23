import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

const execFilePromise = promisify(execFile);

interface Context {
	values?: Record<string, unknown>;
	rest: string[];
	positionals: string[];
	_: string[];
}

export async function getInput(ctx: Context): Promise<string> {
	// When --file option is specified
	if (ctx.values?.file && typeof ctx.values.file === "string") {
		const content = await readFile(ctx.values.file, "utf-8");
		return content;
	}

	// When positional arguments exist (prioritize positionals, otherwise use _)
	const positionals = ctx.rest.length > 0 ? ctx.rest : ctx.positionals || [];
	if (positionals.length > 0) {
		return positionals.join(" ");
	}

	// Read from clipboard (macOS only)
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
