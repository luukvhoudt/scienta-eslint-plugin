import { TSESLint } from "@typescript-eslint/utils";
import { rules } from './rules';

const pluginName = '@scienta';

export const configs = {
	recommended: {
		plugins: [pluginName],
		rules: Object.fromEntries(Object.keys(rules).map(ruleName => [`${pluginName}/${ruleName}`, 'error'])),
	},
} as Record<string, TSESLint.Linter.ConfigType>;
