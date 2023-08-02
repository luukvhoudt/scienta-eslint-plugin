import { TSESTree } from '@typescript-eslint/utils';
import { ALL_NG_MODULE_DECORATORS } from '../selectors';
import { createEslintRule } from '../utils/create-eslint-rule';
import { fixUnsortedProps } from "../utils/fix-unsorted-props";
import { getArgumentsFromIdentifier } from "../utils/get-arguments-from-identifier";
import { getPropsFromObject } from "../utils/get-props-from-object";
import { getSortedPropsWhenUnsorted } from "../utils/get-sorted-props-when-unsorted";
import { getSourceCodeFromAsts } from "../utils/get-source-code-from-asts";

export const ruleName = 'ng-module-decorator-props-order';
export const messageId = 'ngModuleDecoratorPropsOrderError' as const;

const allPropNamesSorted = ['imports', 'declarations', 'exports'];

export default createEslintRule<[], typeof messageId>({
	name: ruleName,
	meta: {
		type: 'layout',
		fixable: 'code',
		docs: {
			description: 'Unifies the order of the props in @NgModule(props)',
			recommended: 'recommended',
		},
		schema: [],
		messages: {
			ngModuleDecoratorPropsOrderError: [
				'The order of the props of the @NgModule decorator is incorrect.',
				'Please reorder the props to the following:',
				` - ${allPropNamesSorted.join('\n - ')}\n`,
			].join('\n'),
		},
	},
	defaultOptions: [],
	create: context => ({
		[ALL_NG_MODULE_DECORATORS]: (node: TSESTree.Identifier) => {
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
