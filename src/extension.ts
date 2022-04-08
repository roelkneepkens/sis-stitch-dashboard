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
	let lanes = getLanes();
	let htmlHeader: string = ``;
	let htmlBody: string =``;
	let html: string = ``;
	let htmlFiles: string = ``;
	htmlHeader 	+= ` 
	<div class="header">
		<h1>Details</h1>
	</div>
	<div class="navbar">
		<a class="active" href="#lanes">Lanes</a>
		<a href="#implementation">Implementation</a>
		<a href="#specifications">Specifications</a>
	</div>
	`;
	let files = vscode.workspace.findFiles('*.*').then(f =>{
		f.forEach(function(filex){
			htmlFiles += `<tr><td>${filex.path}</td></tr>`;
		});

		
		
	});
	
	htmlBody += `<div class="detailpane">
	<div style="overflow-x:auto;">
		<table class="table">
			<thead>
			<tr><td>Lane</td><td>EXPRESS</td><td>ECONOMY</td></tr>
			</thead>
			<tbody>
				<tr><td>NL-NL</td><td class="checkmark"><i class="fa fa-check"></i></td><td class="checkmark"><i class="fa fa-check"></i></td></tr>
				<tr><td>NL-DE</td><td class="checkmark"><i class="fa fa-check"></i></td><td class="checkmark"><i class="fa fa-check"></i></td></tr>
				<tr><td>NL-CH</td><td class="checkmark"><i class="fa fa-check"></i></td><td class="checkmark"><i class="fa fa-remove"></i></td></tr>
				<tr><td>NL-US</td><td class="checkmark"><i class="fa fa-check"></i></td><td class="checkmark"><i class="fa fa-remove"></i></td></tr>
				` + htmlFiles + `
			</tbody>
		</table>
	</div>
</div>`;

	html += htmlHeader + htmlBody;
	return html;
  }

  function getLanes(): string[]{
	return ['NL-NL','NL-DE','NL-CH', 'NL-US'];
  }

