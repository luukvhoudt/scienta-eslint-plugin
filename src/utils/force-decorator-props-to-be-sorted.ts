import { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { fixUnsortedProps } from './fix-unsorted-props';
import { getArgumentsFromIdentifier } from './get-arguments-from-identifier';
import { getPropsFromObject } from './get-props-from-object';
import { getSortedPropsWhenUnsorted } from './get-sorted-props-when-unsorted';
import { getSourceCodeFromAsts } from './get-source-code-from-asts';

export function forceDecoratorPropsToBeSorted<MessageId extends string, Options extends readonly unknown[]>(
	messageId: MessageId,
	allPropNamesSorted: string[],
	context: Readonly<TSESLint.RuleContext<MessageId, Options>>,
) {
	return (node: TSESTree.Identifier) => {
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
	};
}