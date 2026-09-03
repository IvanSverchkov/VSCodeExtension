import * as vscode from 'vscode';

// --------------------------------------------------------------------------
// Подготовка нескольких терминалов для работы
// --------------------------------------------------------------------------
export const runPricingPage = vscode.commands.registerCommand('MyHelpfulExtension.runPricingPage', () => {
  if (vscode.window.activeTerminal) {
    const django = vscode.window.createTerminal({
      name: 'Django',
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    const buildSSRServer = vscode.window.createTerminal({
      name: 'Build SSR server',
      location: { parentTerminal: django },
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    const buildSSRClient = vscode.window.createTerminal({
      name: 'Build SSR client',
      location: { parentTerminal: django },
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    const startSSRServer = vscode.window.createTerminal({
      name: 'Start SSR server',
      location: { parentTerminal: django },
      color: new vscode.ThemeColor('terminal.ansiGreen'),
    });

    setTimeout(() => {
      django.sendText('. .venv/bin/activate && make install_dev && make run_dev_backend');
      buildSSRServer.sendText('pnpm run ssr:dev:build:server');
      buildSSRClient.sendText('pnpm run ssr:dev:build:client');
      startSSRServer.sendText('pnpm run ssr:dev:start:server');
    }, 1000);
  }
});
