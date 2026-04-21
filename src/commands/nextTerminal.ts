import * as vscode from 'vscode';
import * as cp from 'child_process';

import { getActiveFolderPath } from '../utils';

// --------------------------------------------------------------------------
// TODO: Тут есть какой-то баг при котором при первом проходе мы в конце
// создаем еще один новый терминал, но при последующих новый терминал уже
// не создается -- стоит поправить
// --------------------------------------------------------------------------
const outputChannel = vscode.window.createOutputChannel('My Extension Name');

outputChannel.appendLine(`Initial state`);
outputChannel.appendLine(`Terminals (${vscode.window.terminals.length}): ${vscode.window.terminals.map(t => t.name).join(' > ')}`);

export const nextTerminal = vscode.commands.registerCommand('MyHelpfulExtension.nextTerminal', () => {
  if (vscode.window.activeTerminal) {
    outputChannel.appendLine('---');
    outputChannel.appendLine(`Active: ${vscode.window.activeTerminal.name}`);
    outputChannel.appendLine(`Terminals (${vscode.window.terminals.length}): ${vscode.window.terminals.map(t => t.name).join(' > ')}`);

    let isNextTerminal = false;
    
    for (let i = 0; i < vscode.window.terminals.length; i++) {
      const terminal = vscode.window.terminals[i];

      if (isNextTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- show`);
        terminal.show();
        break;
      }

      if (i === vscode.window.terminals.length - 1) {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- last`);
        vscode.window.terminals[0].show();
        break;
      }

      if (terminal === vscode.window.activeTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- current`);
        isNextTerminal = true;
      } else {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- not next`);
      }
    }
  }
});

export const prevTerminal = vscode.commands.registerCommand('MyHelpfulExtension.prevTerminal', () => {
  if (vscode.window.activeTerminal) {
    outputChannel.appendLine('---');
    outputChannel.appendLine(`Active: ${vscode.window.activeTerminal.name}`);
    outputChannel.appendLine(`Terminals (${vscode.window.terminals.length}): ${vscode.window.terminals.map(t => t.name).join(' > ')}`);

    let isPrevTerminal = false;
    
    for (let i = vscode.window.terminals.length - 1; i >= 0; i--) {
      const terminal = vscode.window.terminals[i];

      if (isPrevTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- show`);
        terminal.show();
        break;
      }

      if (i === 0) {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- first`);
        vscode.window.terminals[vscode.window.terminals.length - 1].show();
        break;
      }

      if (terminal === vscode.window.activeTerminal) {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- current`);
        isPrevTerminal = true;
      } else {
        outputChannel.appendLine(`i: ${i}, terminal: ${vscode.window.terminals[i].name} -- not prev`);
      }
    }
  }
});