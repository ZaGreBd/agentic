import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "agentic" is now active!');

	const disposable = vscode.commands.registerCommand('agentic.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Agentic!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
