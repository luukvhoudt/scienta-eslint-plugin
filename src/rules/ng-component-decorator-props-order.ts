import { TSESTree } from '@typescript-eslint/utils';
import { ALL_COMPONENT_DECORATORS } from '../selectors';
import { createEslintRule } from '../utils/create-eslint-rule';
import { fixUnsortedProps } from "../utils/fix-unsorted-props";
import { getArgumentsFromIdentifier } from "../utils/get-arguments-from-identifier";
import { getPropsFromObject } from "../utils/get-props-from-object";
import { getSortedPropsWhenUnsorted } from "../utils/get-sorted-props-when-unsorted";
import { getSourceCodeFromAsts } from "../utils/get-source-code-from-asts";

export const ruleName = 'ng-component-decorator-props-order';
export const messageId = 'ngComponentDecoratorPropsOrderError' as const;

const allPropNamesSorted = [
	'selector',
	'exportAs',
	'templateUrl',
	'template',
	'styleUrls',
	'styles',
	'animations',
	'changeDetection',
	'standalone',
	'imports',
	'providers',
];

export default createEslintRule<[], typeof messageId>({
	name: ruleName,
	meta: {
		type: 'layout',
		fixable: 'code',
		docs: {
			description: 'Unifies the order of the props in @Component(props)',
			recommended: 'recommended',
		},
		schema: [],
		messages: {
			ngComponentDecoratorPropsOrderError: [
				'The order of the props of the @Component decorator is incorrect.',
				'Please reorder the props to the following:',
				` - ${allPropNamesSorted.join('\n - ')}\n`,
			].join('\n'),
		},
	},
	defaultOptions: [],
	create: context => ({
		[ALL_COMPONENT_DECORATORS]: (node: TSESTree.Identifier) => {
			const callExpressionArguments = getArgumentsFromIdentifier<TSESTree.ObjectExpression>(node);
			const objectExpression = callExpressionArguments ? callExpressionArguments[0] : null;
			const possiblyUnsortedProps = getPropsFromObject(objectExpression);
			const sortedProps = getSortedPropsWhenUnsorted(possiblyUnsortedProps, allPropNamesSorted);
			const sourceCodeFromSortedProps = getSourceCodeFromAsts(context.getSourceCode().lines, sortedProps);
			if (!objectExpression || !possiblyUnsortedProps || !sourceCodeFromSortedProps) {
				return;
			}

			context.report({
				loc: objectExpression.loc,
				messageId: messageId,
				fix: fixUnsortedProps(possiblyUnsortedProps, sourceCodeFromSortedProps),
			});
		},
	}),
});
