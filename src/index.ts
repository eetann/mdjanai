import { cli } from "gunshi";
import * as pkg from "../package.json";

const argv = process.argv.slice(2);

await cli(
	argv,
	{
		name: "mdjanai",
		description:
			// TODO: 説明書いて、package.jsonにも書く
			"",
		args: {
			file: {
				short: "f",
				// TODO: ファイル名のやつ
				description: "",
				type: "string",
			},
		},
		async run(ctx) {
			console.log("test");
		},
	},
	{
		version: pkg.version,
	},
);

