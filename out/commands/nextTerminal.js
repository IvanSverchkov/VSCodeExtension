"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTerminal = void 0;
const vscode = require("vscode");
// --------------------------------------------------------------------------
// Подготовка сообщения для commit
// --------------------------------------------------------------------------
exports.nextTerminal = vscode.commands.registerCommand('MyHelpfulExtension.nextTerminal', () => {
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
//# sourceMappingURL=nextTerminal.js.map