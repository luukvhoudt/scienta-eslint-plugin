import { TSESTree } from "@typescript-eslint/utils";

export function getLinesFromAst(lines: string[], ast: TSESTree.Node): string[] {
	const astLines = lines.slice(ast.loc.start.line - 1, ast.loc.end.line);

	if (astLines.length === 1) {
		return [astLines[0].slice(ast.loc.start.column, ast.loc.end.column)];
	}

	const firstLine = astLines.shift() ?? '';
	const lastLine = astLines.pop() ?? firstLine;

	return [
		firstLine.slice(ast.loc.start.column),
		...astLines,
		lastLine.slice(0, ast.loc.end.column),
	];
}
