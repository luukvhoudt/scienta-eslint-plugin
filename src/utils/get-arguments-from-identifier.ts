import { TSESTree } from "@typescript-eslint/utils";

export function getArgumentsFromIdentifier<T extends TSESTree.CallExpressionArgument>(node: TSESTree.Identifier | null): T[] | null {
	if (!node) {
		return null;
	}

	const callExpression = node.parent as TSESTree.CallExpression | null;
	if (!callExpression?.arguments) {
		return null;
	}

	return callExpression.arguments as T[];
}
