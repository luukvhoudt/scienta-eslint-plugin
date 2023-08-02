import { TSESTree } from "@typescript-eslint/utils";

export function getPropsFromObject(node: TSESTree.ObjectExpression | null): TSESTree.Property[] | null {
	if (!node?.properties) {
		return null;
	}

	return node.properties.filter(elem => elem.type === TSESTree.AST_NODE_TYPES.Property) as TSESTree.Property[];
}
