import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
	  vscode.commands.registerCommand('mypanel.start', () => {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
		  'mypanel',  // <--- identifier
		  'Stitch dashboard', // <--- title
		  vscode.ViewColumn.One,
		  {}
		);
  
		// And set its HTML content
		panel.webview.html = getMyWebviewContent(panel.webview, context);   // <--- HTML
	  })	
	);
  }
 
  function getMyWebviewContent(webview: vscode.Webview, context: any): string { 
	let html: string = ``;
	
	const myStyle = webview.asWebviewUri(vscode.Uri.joinPath(
		  context.extensionUri, 'media', 'style.css'));   // <--- 'media' is the folder where the .css file is stored
	
	// construct your HTML code
	html += `
			<!DOCTYPE html>
			<html>
				<head>
				  <link href="${myStyle}" rel="stylesheet" />   
				</head>
				<body>
				  <div class="main"> 
				  	<h1>Dashboard</h1>
					  <div>1</div>
					  <div>2</div>
					  <div>3</div>
					<h1>Scenarios</h1>
					<div class="scenarios">
					<h2>From<h2>
					<h2>To<h2>
					
					<h2>ServicesLevel<h2>

					<h2>Other Options
						<li>
						</li>
					</div>
				  </div>
				</body>
			 </html>
	`;
	// -----------------------
	return html;
  }