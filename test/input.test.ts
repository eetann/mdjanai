import { expect, test } from "bun:test";
import { unlinkSync, writeFileSync } from "node:fs";
import { getInput } from "../src/input";

test("reads input from file", async () => {
	const testFile = "/tmp/test-mdjanai-file.md";
	const content = "# Test Content";

	// Create test file
	writeFileSync(testFile, content);

	try {
		const ctx = {
			values: { file: testFile },
			rest: [],
			positionals: [],
			_: [],
		};
		const result = await getInput(ctx);
		expect(result).toBe(content);
	} finally {
		// Cleanup
		unlinkSync(testFile);
	}
});

test("reads input from positional arguments", async () => {
	const ctx = {
		values: {},
		rest: [],
		positionals: ["**test**", "foo"],
		_: ["**test**", "foo"],
	};
	const result = await getInput(ctx);
	expect(result).toBe("**test** foo");
});

test("prioritizes file option over positional arguments", async () => {
	const testFile = "/tmp/test-mdjanai-priority.md";
	const fileContent = "# From File";

	// Create test file
	writeFileSync(testFile, fileContent);

	try {
		const ctx = {
			values: { file: testFile },
			rest: [],
			positionals: ["**test**", "foo"], // Positional arguments exist but should be ignored
			_: ["**test**", "foo"],
		};
		const result = await getInput(ctx);
		expect(result).toBe(fileContent); // File content is returned
	} finally {
		// Cleanup
		unlinkSync(testFile);
	}
});

test("throws error for non-existent file", async () => {
	const ctx = {
		values: { file: "/tmp/non-existent-file-mdjanai.md" },
		rest: [],
		positionals: [],
		_: [],
	};

	try {
		await getInput(ctx);
		// Fail if error was not thrown
		expect(true).toBe(false);
	} catch (error) {
		// Expect error to be thrown
		expect(error).toBeDefined();
	}
});

test("reads input from clipboard", async () => {
	// Run only on macOS environment
	if (process.platform !== "darwin") {
		return;
	}

	// Set test data to clipboard
	const { execSync } = await import("node:child_process");
	const testContent = "**clipboard test**";
	execSync(`printf '%s' "${testContent}" | pbcopy`);

	const ctx = {
		values: {},
		rest: [],
		positionals: [],
		_: [],
	};

	const result = await getInput(ctx);
	expect(result).toBe(testContent);
});
