import { expect, test } from "bun:test";
import { unlinkSync, writeFileSync } from "node:fs";
import { getInput } from "../src/input";

test("正常系_ファイルからの入力", async () => {
	const testFile = "/tmp/test-mdjanai-file.md";
	const content = "# Test Content";

	// テストファイルを作成
	writeFileSync(testFile, content);

	try {
		const ctx = {
			values: { file: testFile },
			positionals: [],
			_: [],
		};
		const result = await getInput(ctx);
		expect(result).toBe(content);
	} finally {
		// クリーンアップ
		unlinkSync(testFile);
	}
});

test("正常系_位置引数からの入力", async () => {
	const ctx = {
		values: {},
		positionals: ["**test**", "foo"],
		_: ["**test**", "foo"],
	};
	const result = await getInput(ctx);
	expect(result).toBe("**test** foo");
});

test("優先順位_ファイルオプションが最優先", async () => {
	const testFile = "/tmp/test-mdjanai-priority.md";
	const fileContent = "# From File";

	// テストファイルを作成
	writeFileSync(testFile, fileContent);

	try {
		const ctx = {
			values: { file: testFile },
			positionals: ["**test**", "foo"], // 位置引数もあるが無視されるべき
			_: ["**test**", "foo"],
		};
		const result = await getInput(ctx);
		expect(result).toBe(fileContent); // ファイルの内容が返される
	} finally {
		// クリーンアップ
		unlinkSync(testFile);
	}
});

test("異常系_存在しないファイル", async () => {
	const ctx = {
		values: { file: "/tmp/non-existent-file-mdjanai.md" },
		positionals: [],
		_: [],
	};

	try {
		await getInput(ctx);
		// エラーが投げられなかった場合はテスト失敗
		expect(true).toBe(false);
	} catch (error) {
		// エラーが投げられることを期待
		expect(error).toBeDefined();
	}
});

test("正常系_クリップボードからの入力", async () => {
	// macOS環境でのみ実行
	if (process.platform !== "darwin") {
		return;
	}

	// クリップボードにテストデータを設定
	const { execSync } = await import("node:child_process");
	const testContent = "**clipboard test**";
	execSync(`printf '%s' "${testContent}" | pbcopy`);

	const ctx = {
		values: {},
		positionals: [],
		_: [],
	};

	const result = await getInput(ctx);
	expect(result).toBe(testContent);
});
