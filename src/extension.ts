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

		let folders = ['APG eCommerce', 'Australia Post', 'B2C Europe', 'bpost'];
		
  
		// And set its HTML content
		panel.webview.html = getMyWebviewContent(panel.webview, context, folders);   // <--- HTML
	  })	
	);
  }
 
  function getMyWebviewContent(webview: vscode.Webview, context: any, folders: string[]): string { 
	let html: string = ``;
	let foldersHtml: string = ``;
	
	const myStyle = webview.asWebviewUri(vscode.Uri.joinPath(
		  context.extensionUri, 'media', 'style.css'));   // <--- 'media' is the folder where the .css file is stored
	
	for (let folder of folders){
		foldersHtml += `<div class="scenario">
		<h2>` + folder + `<h2>
	
		<h2>ServicesLevel<h2>

		</div>`;

	}
	
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
					  <div class="scenarios">
						<h1>Scenarios</h1>
						` + foldersHtml + `
						</div>
				  </div>
				</body>
			 </html>
	`;
	// -----------------------
	return html;
  }