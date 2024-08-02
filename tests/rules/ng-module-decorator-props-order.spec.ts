import rule, { messageId, ruleName } from '../../src/rules/ng-module-decorator-props-order';
import { runRuleTester } from '../utils/run-rule-tester';

runRuleTester<typeof messageId, []>({
	ruleName,
	messageId,
	rule,
	validStatements: [
		`
			@DontParseMe()
			@NgModule({
				providers: [],
				declarations: [],
				exports: [
					ExampleComponent
				],
			})
			class ExampleModule {}
		`,
		`
			@NgModule({
				imports: [],
				declarations: [],
				exports: []
			})
			class ExampleModule {}
		`,
	],
	invalidStatements: [
		`
			@DontParseMe()
			@NgModule({
				exports: [
					ExampleComponent
				],
				declarations: [],
				providers: [],
			})
			class ExampleModule {}
		`,
		`
			@NgModule({
				declarations: [],
				imports: [],
				exports: []
			})
			class ExampleModule {}
		`,
	],
});
