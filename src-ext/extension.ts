import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('chat-any-gpt.openChat', () => {
        const panel = vscode.window.createWebviewPanel(
            'chatAnyGpt',
            'Chat with Any GPT',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [context.extensionUri.with({ path: context.extensionUri.path + '/dist' })]
            }
        );
        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
    });
    context.subscriptions.push(disposable);
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
    const scriptUri = webview.asWebviewUri(extensionUri.with({ path: extensionUri.path + '/dist/bundle.js' }));
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat with Any GPT</title>
</head>
<body>
    <div id="root"></div>
    <script src="${scriptUri}"></script>
</body>
</html>`;
}

export function deactivate() {}