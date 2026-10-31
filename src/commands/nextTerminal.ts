import * as vscode from 'vscode';
import * as cp from 'child_process';

import { getActiveFolderPath } from '../utils';

const outputChannel = vscode.window.createOutputChannel('My Extension Name');

outputChannel.appendLine(`Initial state`);
outputChannel.appendLine(`Terminals (${vscode.window.terminals.length}): ${vscode.window.terminals.map(t => t.name).join(' > ')}`);

export const nextTerminal = vscode.commands.registerCommand('MyHelpfulExtension.nextTerminal', () => {
  if (vscode.window.activeTerminal) {
    const visibleTerminals = getVisibleTerminals();

    outputChannel.appendLine('---');
    outputChannel.appendLine(`Active: ${vscode.window.activeTerminal.name}`);
    outputChannel.appendLine(`Terminals (${visibleTerminals.length}): ${visibleTerminals.map(t => t.name).join(' > ')}`);

    let isNextTerminal = false;
    
    for (let i = 0; i < visibleTerminals.length; i++) {
      const terminal = visibleTerminals[i];

      if (isNextTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- show`);
        terminal.show();
        break;
      }

      if (i === visibleTerminals.length - 1) {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- last`);
        visibleTerminals[0].show();
        break;
      }

      if (terminal === vscode.window.activeTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- current`);
        isNextTerminal = true;
      } else {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- not next`);
      }
    }
  }
});

export const prevTerminal = vscode.commands.registerCommand('MyHelpfulExtension.prevTerminal', () => {
  if (vscode.window.activeTerminal) {
    const visibleTerminals = getVisibleTerminals();

    outputChannel.appendLine('---');
    outputChannel.appendLine(`Active: ${vscode.window.activeTerminal.name}`);
    outputChannel.appendLine(`Terminals (${visibleTerminals.length}): ${visibleTerminals.map(t => t.name).join(' > ')}`);

    let isPrevTerminal = false;
    
    for (let i = visibleTerminals.length - 1; i >= 0; i--) {
      const terminal = visibleTerminals[i];

      if (isPrevTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- show`);
        terminal.show();
        break;
      }

      if (i === 0) {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- first`);
        visibleTerminals[visibleTerminals.length - 1].show();
        break;
      }

      if (terminal === vscode.window.activeTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- current`);
        isPrevTerminal = true;
      } else {
        outputChannel.appendLine(`i: ${i}, terminal: ${visibleTerminals[i].name} -- not prev`);
      }
    }
  }
});

function getVisibleTerminals() {
  // Note: другие расширения, например GitLab Duo Cards могут создавать свои скрытые терминалы, мы не хотим их использовать.
  return vscode.window.terminals.filter(terminal => !('hideFromUser' in terminal.creationOptions && terminal.creationOptions.hideFromUser));
}
