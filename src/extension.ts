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

  function getMyWebviewContent(webview: vscode.Webview, context: any):string { 
	let html: string = ``;
	let foldersHtml: string = ``;
	
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
					<div class="carrier-list">`+ getCarrierList() +` </div>
					<div class="carrier-detail">`+ getCarrierDetail() +` </div>
				  </div>
				</body>
			 </html>
	`;
	// -----------------------
	return html;
  }

  function getCarriers(){
	let folders = ['APG eCommerce', 'Australia Post', 'B2C Europe', 'bpost'];
	return folders;
}
  
  function getCarrierList(): string {
	let html1: string = ``;
	html1 += '<h1>Wouter</h1>';
	return html1;
  }

  function getCarrierDetail(): string {
	let html2: string = ``;
	html2 	+= ` 
	<div class="header">
		<h1>Details</h1>
	</div>
	<div class="navbar">
		<a class="active" href="#lanes">Lanes</a>
		<a href="#implementation">Implementation</a>
		<a href="#specifications">Specifications</a>
	</div>
	`;

	return html2;
  }
