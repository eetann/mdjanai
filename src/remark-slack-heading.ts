import type { Heading, Root, Strong, Text } from "mdast";
import { toString as nodeToString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const remarkSlackHeading: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "heading", (node: Heading, index, parent) => {
			if (typeof index !== "number" || !parent) {
				return;
			}

			// Get the text content from all child nodes
			const textContent = nodeToString(node);

			// Generate # symbols based on heading depth
			const hashSymbols = "#".repeat(node.depth);

			// Create a strong node with # symbols and text
			const strongNode: Strong = {
				type: "strong",
				children: [
					{
						type: "text",
						value: `${hashSymbols} ${textContent}`,
					} as Text,
				],
			};

			// Replace the heading node with the strong node
			parent.children[index] = strongNode;
		});
	};
};
