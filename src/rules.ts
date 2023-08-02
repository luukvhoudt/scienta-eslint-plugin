import { TSESLint } from '@typescript-eslint/utils';
import ngComponentDecoratorPropsOrder, { ruleName as ngComponentDecoratorPropsOrderKey } from './rules/ng-component-decorator-props-order';
import ngModuleDecoratorPropsOrder, { ruleName as ngModuleDecoratorPropsOrderKey } from './rules/ng-module-decorator-props-order';

export const rules = {
	[ngComponentDecoratorPropsOrderKey]: ngComponentDecoratorPropsOrder,
	[ngModuleDecoratorPropsOrderKey]: ngModuleDecoratorPropsOrder,
} as Record<string, TSESLint.RuleModule<string, unknown[]>>;
