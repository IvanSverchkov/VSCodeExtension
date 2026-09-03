import * as vscode from 'vscode';

// --------------------------------------------------------------------------
// Подготовка нескольких терминалов для работы
// --------------------------------------------------------------------------
export const runPricingPageLinters = vscode.commands.registerCommand('MyHelpfulExtension.runPricingPageLinters', () => {
  if (vscode.window.activeTerminal) {
    const a1 = vscode.window.createTerminal({
      name: 'uv run pytest',
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    const a2 = vscode.window.createTerminal({
      name: 'make check_python_code',
      location: { parentTerminal: a1 },
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    const a3 = vscode.window.createTerminal({
      name: 'pnpm run test',
      location: { parentTerminal: a1 },
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    const a4 = vscode.window.createTerminal({
      name: 'pnpm run lint',
      location: { parentTerminal: a1 },
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    setTimeout(() => {
      a1.sendText('source .venv/bin/activate && uv run pytest');
      a2.sendText('source .venv/bin/activate && make check_python_code');
      a3.sendText('pnpm run test');
      a4.sendText('pnpm run lint');
    }, 1000);
  }
});
