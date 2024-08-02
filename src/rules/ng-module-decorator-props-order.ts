import { createEslintRule } from '../utils/create-eslint-rule';
import { forceDecoratorPropsToBeSorted } from '../utils/force-decorator-props-to-be-sorted';

export const ruleName = 'ng-module-decorator-props-order';
export const messageId = 'ngModuleDecoratorPropsOrderError' as const;

const allNgModulesSelector = 'ClassDeclaration > Decorator > CallExpression > Identifier[name="NgModule"]';
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
	create: context => ({[allNgModulesSelector]: forceDecoratorPropsToBeSorted(messageId, allPropNamesSorted, context)}),
});
