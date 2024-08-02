import rule, { messageId, ruleName } from '../../src/rules/ng-component-decorator-props-order';
import { runRuleTester } from '../utils/run-rule-tester';

runRuleTester({
	ruleName,
	messageId,
	rule,
	validStatements: [
		`
			@Component({
				selector: "example",
				exportAs: "Example",
				template: "<ng-content></ng-content>",
				styleUrls: [
					'example.component.scss'
				],
				styles: ":host { background-color: red; }",
				animations: [],
				changeDetection: ChangeDetectionStrategy.OnPush,
				providers: [
				],
			})
			class ExampleComponent {}
		`,
		`
			@Component({
				selector: "example",
				template: "<ng-content></ng-content>",
				styleUrl: "example.component.scss",
				changeDetection: ChangeDetectionStrategy.OnPush,
			})
			class ExampleComponent {}
		`,
	],
	invalidStatements: [
		`
			@Component({
				exportAs: "Example",
				selector: "example",
				styleUrls: [
					'example.component.scss'
				],
				template: "<ng-content></ng-content>",
				animations: [],
				styles: ":host { background-color: red; }",
				providers: [
				],
				changeDetection: ChangeDetectionStrategy.OnPush,
			})
			class ExampleComponent {}
		`,
		`
			@Component({
				template: "<ng-content></ng-content>",
				selector: "example",
				changeDetection: ChangeDetectionStrategy.OnPush,
				styleUrl: "example.component.scss",
			})
			class ExampleComponent {}
		`,
	],
});
