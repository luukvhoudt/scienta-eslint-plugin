import { createEslintRule } from '../utils/create-eslint-rule';
import { forceDecoratorPropsToBeSorted } from '../utils/force-decorator-props-to-be-sorted';

export const ruleName = 'ng-component-decorator-props-order';
export const messageId = 'ngComponentDecoratorPropsOrderError' as const;

const allNgComponentsSelector = 'ClassDeclaration > Decorator > CallExpression > Identifier[name="Component"]';
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
	create: context => ({[allNgComponentsSelector]: forceDecoratorPropsToBeSorted(messageId, allPropNamesSorted, context)}),
});
