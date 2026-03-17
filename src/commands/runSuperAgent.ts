import * as vscode from 'vscode';
import * as cp from 'child_process';

import { getActiveFolderPath } from '../utils';

export const runSuperAgent = vscode.commands.registerCommand(
  'MyHelpfulExtension.runSuperAgent',
  async () => {
    const encoder = new TextEncoder();

    try {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        vscode.window.showErrorMessage('Open a workspace first.');
        return;
      }

      const stateUri = vscode.Uri.joinPath(workspaceFolder.uri, 'state.md');

      // Создаём файл, если его нет
      try {
        await vscode.workspace.fs.stat(stateUri);
      } catch {
        await vscode.workspace.fs.writeFile(
          stateUri,
          encoder.encode('# State\n\n')
        );
      }

      // Предпочтительная модель: GPT-5 mini (OpenAI).
      // Попробуем выбрать её по доступным моделям; если недоступна — возьмём первую.
      const models = await vscode.lm.selectChatModels({
        vendor: 'copilot'
      });

      if (!models.length) {
        vscode.window.showErrorMessage('No Copilot chat models available.');
        return;
      }

      const preferred = models.find((m: any) => {
        const id = (m.id || m.modelId || '').toString().toLowerCase();
        const name = (m.displayName || m.name || '').toString().toLowerCase();
        // vscode.window.showInformationMessage(`${id} / ${name}`);

        return (
          id.includes('mini') ||
          name.includes('mini')
        );
      });

      // vscode.window.showInformationMessage(`SELECTED: ${preferred?.id} / ${preferred?.name}`);

      const model = preferred ?? models[0];

      const agentNames = [
        `${model.name}-1`,
        `${model.name}-2`,
        `${model.name}-3`,
      ];

      const results: string[] = [];

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'In progress',
          cancellable: true
        },
        async (progress, token) => {
          for (let i = 0; i < agentNames.length; i++) {
            if (token.isCancellationRequested) {
              break;
            }

            const agentName = agentNames[i];
            const clipboardText = await vscode.env.clipboard.readText();

            progress.report({ message: `${agentName}`, increment: 33 });

            const messages = [
              vscode.LanguageModelChatMessage.User(clipboardText.trim())
            ];

            const response = await model.sendRequest(messages, {}, token);

            let text = '';
            for await (const chunk of response.text) {
              text += chunk;
            }

            results.push(`- ${agentName}: ${text}`);
          }
        }
      );

      if (!results.length) {
        vscode.window.showWarningMessage('No results were written.');
        return;
      }

      const existing = Buffer.from(
        await vscode.workspace.fs.readFile(stateUri)
      ).toString('utf8');

      const block = [
        '',
        `## Run ${new Date().toISOString()}`,
        ...results,
        ''
      ].join('\n');

      await vscode.workspace.fs.writeFile(
        stateUri,
        encoder.encode(existing + block)
      );

      const doc = await vscode.workspace.openTextDocument(stateUri);
      await vscode.window.showTextDocument(doc);

      vscode.window.showInformationMessage('3 agents finished.');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      vscode.window.showErrorMessage(`runSuperAgent failed: ${message}`);
    }
  }
);