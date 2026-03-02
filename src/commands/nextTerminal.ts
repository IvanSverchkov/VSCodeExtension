import * as vscode from 'vscode';
import * as cp from 'child_process';

import { getActiveFolderPath } from '../utils';

// --------------------------------------------------------------------------
// TODO: Тут есть какой-то баг при котором при первом проходе мы в конце
// создаем еще один новый терминал, но при последующих новый терминал уже
// не создается -- стоит поправить
// --------------------------------------------------------------------------
export const nextTerminal = vscode.commands.registerCommand('MyHelpfulExtension.nextTerminal', () => {
  if (vscode.window.activeTerminal) {
    let isNextTerminal = false;

    for (let i = 0; i < vscode.window.terminals.length; i++) {
      const terminal = vscode.window.terminals[i];

      if (isNextTerminal) {
        terminal.show();
        break;
      }

      if (i === vscode.window.terminals.length - 1) {
        vscode.window.terminals[0].show();
        break;
      }

      if (terminal === vscode.window.activeTerminal) {
        isNextTerminal = true;
      }
    }
  }
});
