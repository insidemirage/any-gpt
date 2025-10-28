/// <reference types="vscode" />

import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const resourcesDir = vscode.Uri.joinPath(context.extensionUri, "dist");
  const provider = vscode.window.registerWebviewViewProvider("AnyGptView", {
    resolveWebviewView(webviewView: vscode.WebviewView) {
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [resourcesDir],
      };
      webviewView.webview.html = getWebviewContent(
        webviewView.webview,
        context
      );
    },
  });
  context.subscriptions.push(provider);
  console.log("Activated!");
}

function getWebviewContent(
  webview: vscode.Webview,
  context: vscode.ExtensionContext
): string {
  const { extensionUri } = context;
  const indexPath = path.join(extensionUri.path, "dist", "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  // Replace asset paths with webview URIs
  const assetRegex = /(src|href)="\/(assets\/[^"]*)"/g;
  html = html.replace(assetRegex, (match, attr, assetPath) => {
    const assetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "dist", assetPath)
    );
    return `${attr}="${assetUri}"`;
  });

  return html;
}

export function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
