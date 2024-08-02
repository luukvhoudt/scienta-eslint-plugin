import { TSESLint, TSESTree } from "@typescript-eslint/utils";

export function fixUnsortedProps(unsortedProps: TSESTree.Property[], sortedPropLines: string[]): TSESLint.ReportFixFunction {
	return (fixer) => unsortedProps.map((elem, idx) =>
		fixer.replaceText(elem, sortedPropLines[idx]),
	);
}
