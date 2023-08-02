import { TSESLint } from '@typescript-eslint/utils';

export function runRuleTester<TMessageIds extends string, TOptions extends Readonly<unknown[]> = unknown[]>(props: {
	ruleName: string,
	messageId: TMessageIds,
	rule: TSESLint.RuleModule<TMessageIds, TOptions>,
	validStatements: string[],
	invalidStatements: string[],
}): void {
	(new TSESLint.RuleTester({
		parser: require.resolve('@typescript-eslint/parser'),
	})).run(props.ruleName, props.rule, {
		valid: props.validStatements.map((validStatement, idx) => ({
			name: `statement #${idx + 1}`,
			code: validStatement,
		})),
		invalid: props.invalidStatements.map((invalidStatement, idx) => ({
			name: `statement #${idx + 1}`,
			code: invalidStatement,
			errors: [{messageId: props.messageId}],
			output: props.validStatements[idx],
		})),
	});
}
