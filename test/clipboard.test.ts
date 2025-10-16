import { expect, test } from "bun:test";
import { copyToClipboard } from "../src/clipboard";

test("モック_macOSでのクリップボード書き込み", async () => {
	// プラットフォームチェックのため、実際のprocess.platformを確認
	if (process.platform !== "darwin") {
		// macOS以外では未対応エラーが投げられることを確認
		try {
			await copyToClipboard("<strong>test</strong>", "**test**");
			expect(true).toBe(false); // エラーが投げられなかったら失敗
		} catch (error: unknown) {
			expect(error instanceof Error).toBe(true);
			if (error instanceof Error) {
				expect(error.message).toContain("Unsupported platform");
			}
		}
	} else {
		// macOSでは正常に実行されることを確認
		// エラーが投げられなければ成功
		await copyToClipboard("<strong>test</strong>", "**test**");
		expect(true).toBe(true);
	}
});
