import * as vscode from 'vscode';

// --------------------------------------------------------------------------
// Подготовка нескольких терминалов для работы
// --------------------------------------------------------------------------
export const runPricingPage = vscode.commands.registerCommand('MyHelpfulExtension.runPricingPage', () => {
  if (vscode.window.activeTerminal) {
    const djangoTerminal = vscode.window.createTerminal({
      name: 'Django',
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    const buildSSRServerTerminal = vscode.window.createTerminal({
      name: 'Build SSR server',
      location: { parentTerminal: djangoTerminal },
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    const buildSSRClientTerminal = vscode.window.createTerminal({
      name: 'Build SSR client',
      location: { parentTerminal: djangoTerminal },
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    const startSSRServerTerminal = vscode.window.createTerminal({
      name: 'Start SSR server',
      location: { parentTerminal: djangoTerminal },
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    setTimeout(() => {
      djangoTerminal.sendText('. .venv/bin/activate && make install_dev && make run_dev_backend');
      buildSSRServerTerminal.sendText('pnpm run ssr:dev:build:server');
      buildSSRClientTerminal.sendText('pnpm run ssr:dev:build:client');
      startSSRServerTerminal.sendText('pnpm run ssr:dev:start:server');
    }, 1000);
  }
});
