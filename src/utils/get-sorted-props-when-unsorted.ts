import { TSESTree } from "@typescript-eslint/utils";

export function getSortedPropsWhenUnsorted(
	possiblyUnsortedProps: TSESTree.Property[] | null,
	allPropNamesSorted: string[],
): TSESTree.Property[] | null {
	if (!possiblyUnsortedProps) {
		return null;
	}

	const unsortedPropNames = possiblyUnsortedProps.map(prop => (prop?.key as TSESTree.Identifier)?.name);

	const rankPerPropName = Object.fromEntries(allPropNamesSorted.map((key, idx) => [key, idx]));
	const sortedPropNames = [...unsortedPropNames].sort((a, b) => rankPerPropName[a] - rankPerPropName[b]);

	if (JSON.stringify(unsortedPropNames) === JSON.stringify(sortedPropNames)) {
		return null;
	}

	return sortedPropNames.map(propName => possiblyUnsortedProps[unsortedPropNames.indexOf(propName)]) as TSESTree.Property[];
}
