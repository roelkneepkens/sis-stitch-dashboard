import * as vscode from 'vscode';
 //see https://bobbyhadz.com/blog/typescript-http-request
 import axios from 'axios';


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
	  vscode.commands.registerCommand('mypanel.start', () => {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
		  'mypanel',  // <--- identifier
		  'Display Labelary', // <--- title
		  vscode.ViewColumn.One,
		  {}
		);
  
		// And set its HTML content
		getMyWebviewContent(panel.webview, context).then(html =>panel.webview.html = html);   // <--- HTML
	  })	
	);
}

  async function getMyWebviewContent(webview: vscode.Webview, context: any) : Promise<string> { 
	let html: string = ``;
	let foldersHtml: string = ``;
	
	const myStyle = webview.asWebviewUri(vscode.Uri.joinPath(
		  context.extensionUri, 'media', 'style.css'));   // <--- 'media' is the folder where the .css file is stored
	
		let labelaryData = await getPNGFromLabelary();
	// construct your HTML code
	html += `
			<!DOCTYPE html>
			<html>
				<body>
				From Labelary:
				
				
				<img src="data:image/png;base64,${labelaryData}"/>
				  response='${labelaryData}'
				</body>
			 </html>
	`;
	// -----------------------
	return html;
  }




  
  async function getPNGFromLabelary():Promise<string> {

	let zpl:string = '^xa^cfa,50^fo100,100^fdHello World label1^fs^xz^xa^cfa,50^fo100,100^fdHello World label2^fs^xz';


	const response = await axios({
		method: "POST",
		data: zpl,
		url: 'http://api.labelary.com/v1/printers/8dpmm/labels/4x8/0',
			responseType:'arraybuffer',
			responseEncoding: "binary",
			headers:{
				'Content-type': 'application/x-www-form-urlencoded',
				'Accept': 'image/png'
			}
		});
	
		//https://stackoverflow.com/questions/42785229/axios-serving-png-image-is-giving-broken-image
		const result =  Buffer.from(response.data).toString('base64');
		// const result = response.data;
		// let resultstring = JSON.stringify(result);
		// let blah = Buffer.isBuffer(response.data);
		// if (blah){
		// 	resultstring='it is a buffer';
		// }else{
		// 	resultstring='it is not a buffer';
		// }

		// //Make it as blob so it can be easily viewed: https://yahone-chow.medium.com/file-blob-arraybuffer-576a8e99de0d
		// let arraybuf: ArrayBuffer;
		// arraybuf = Buffer.from(result);
		// // //let arraybufString = arraybuf.toString();
		// let ui8 = new Uint8Array(arraybuf);
		// let rawData = [...ui8];
		// let blobfile:Blob;
		// blobfile = new Blob([new Uint8Array(rawData)],{type:'image/png'});



	return result;
  
};




