import { expect, test } from "bun:test";
import { copyToClipboard } from "../src/clipboard";

test("writes to clipboard on macOS", async () => {
	// Check actual process.platform for platform verification
	if (process.platform !== "darwin") {
		// Verify that unsupported platform error is thrown on non-macOS
		try {
			await copyToClipboard("<strong>test</strong>", "**test**");
			expect(true).toBe(false); // Fail if error was not thrown
		} catch (error: unknown) {
			expect(error instanceof Error).toBe(true);
			if (error instanceof Error) {
				expect(error.message).toContain("Unsupported platform");
			}
		}
	} else {
		// Verify successful execution on macOS
		// Success if no error is thrown
		await copyToClipboard("<strong>test</strong>", "**test**");
		expect(true).toBe(true);
	}
});
