import * as vscode from 'vscode';

const REFRESH_COMMAND = 'markdown.preview.refresh';
const MARKDOWN_PREVIEW_VIEW_TYPES = new Set([
  'markdown.preview',
  'vscode.markdown.preview.editor',
]);

const outputChannel = vscode.window.createOutputChannel('[X] Markdown auto refresh preview');

outputChannel.appendLine('Init');

// TODO: Не очень хорошо, что это просто лежит в корне проекта.
// Нужно перенести это например не в commands, но хотя бы в automation.

export function startMarkdownPreviewAutoRefresh(): vscode.Disposable {
  let isRefreshing = false;
  let hadActiveMarkdownPreview = hasActiveMarkdownPreview();
  let markdownPreviewTabs = getMarkdownPreviewTabs();

  const tabChangeListener = vscode.window.tabGroups.onDidChangeTabs((event) => {
    const currentMarkdownPreviewTabs = getMarkdownPreviewTabs();
    const didNavigatePreview = didMarkdownPreviewTabsChange(markdownPreviewTabs, currentMarkdownPreviewTabs);
    const didOpenTabFromPreview = hadActiveMarkdownPreview && event.opened.length > 0;

    markdownPreviewTabs = currentMarkdownPreviewTabs;
    hadActiveMarkdownPreview = hasActiveMarkdownPreview();

    if (didNavigatePreview || didOpenTabFromPreview) {
      refreshMarkdownPreview();
    }
  });

  function refreshMarkdownPreview() {
    if (isRefreshing || !hasOpenMarkdownPreview()) {
      return;
    }

    outputChannel.appendLine('Refresh');
    isRefreshing = true;
    void vscode.commands.executeCommand(REFRESH_COMMAND)
      .then(() => {
        isRefreshing = false;
      }, () => {
        isRefreshing = false;
      });
  }

  return vscode.Disposable.from(tabChangeListener, outputChannel);
}

function hasOpenMarkdownPreview(): boolean {
  return vscode.window.tabGroups.all.some((tabGroup) => {
    return tabGroup.tabs.some((tab) => isMarkdownPreviewTab(tab));
  });
}

function isMarkdownPreviewTab(tab: vscode.Tab | undefined): boolean {
  if (!tab) {
    return false;
  }

  const { input } = tab;

  if (input instanceof vscode.TabInputWebview || input instanceof vscode.TabInputCustom) {
    return MARKDOWN_PREVIEW_VIEW_TYPES.has(input.viewType);
  }

  return false;
}

function hasActiveMarkdownPreview(): boolean {
  return isMarkdownPreviewTab(vscode.window.tabGroups.activeTabGroup.activeTab);
}

function getMarkdownPreviewTabs(): string[] {
  return vscode.window.tabGroups.all.flatMap((tabGroup) => {
    return tabGroup.tabs
      .filter((tab) => isMarkdownPreviewTab(tab))
      .map((tab) => `${tabGroup.viewColumn}:${tab.label}`);
  });
}

function didMarkdownPreviewTabsChange(previous: string[], current: string[]): boolean {
  if (previous.length !== current.length) {
    return false;
  }

  return previous.some((tab, index) => tab !== current[index]);
}
