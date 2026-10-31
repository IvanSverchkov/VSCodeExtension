import * as vscode from 'vscode';

// --------------------------------------------------------------------------
// Подготовка нескольких терминалов для работы
// --------------------------------------------------------------------------
export const runPricingPageLinters = vscode.commands.registerCommand('MyHelpfulExtension.runPricingPageLinters', () => {
  if (vscode.window.activeTerminal) {
    const terminal1 = vscode.window.createTerminal({
      name: 'uv run pytest',
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    const terminal2 = vscode.window.createTerminal({
      name: 'make check_python_code',
      location: { parentTerminal: terminal1 },
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    const terminal3 = vscode.window.createTerminal({
      name: 'pnpm run test',
      location: { parentTerminal: terminal1 },
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    const terminal4 = vscode.window.createTerminal({
      name: 'pnpm run lint',
      location: { parentTerminal: terminal1 },
      color: new vscode.ThemeColor('terminal.ansiMagenta'),
    });

    setTimeout(() => {
      terminal1.sendText('source .venv/bin/activate && uv run pytest');
      terminal2.sendText('source .venv/bin/activate && make check_python_code');
      terminal3.sendText('pnpm run test');
      terminal4.sendText('pnpm run lint');
    }, 1000);
  }
});
