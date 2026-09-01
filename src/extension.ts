// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { prepareTerminals } from './commands/prepareTerminals';
import { nextTerminal } from './commands/nextTerminal';
import { prevTerminal } from './commands/nextTerminal';
import { runSuperAgent } from './commands/runSuperAgent';
import { prepareStashMessage } from './commands/prepareStashMessage';
import { startMarkdownPreviewAutoRefresh } from './markdownPreviewAutoRefresh';
import { runPricingPage } from './commands/runPricingPage';
import { runPricingPageLinters } from './commands/runPricingPageLinters';

export function activate(context: vscode.ExtensionContext) {
	// Register commands
	context.subscriptions.push(prepareTerminals);
	context.subscriptions.push(nextTerminal);
	context.subscriptions.push(prevTerminal);
	context.subscriptions.push(runSuperAgent);
	context.subscriptions.push(prepareStashMessage);
	context.subscriptions.push(runPricingPage);
	context.subscriptions.push(runPricingPageLinters);
	// Enable something else (TODO: Describe this section better)
	context.subscriptions.push(startMarkdownPreviewAutoRefresh());
}

export function deactivate() {}
