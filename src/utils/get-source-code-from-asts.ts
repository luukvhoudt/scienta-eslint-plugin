import { TSESTree } from "@typescript-eslint/utils";
import { getLinesFromAst } from "./get-lines-from-ast";

export function getSourceCodeFromAsts(lines: string[], asts: TSESTree.Node[] | null): string[] | null {
	if (!asts) {
		return null;
	}

	return asts.map(ast => getLinesFromAst(lines, ast).join('\n'), lines);
}
