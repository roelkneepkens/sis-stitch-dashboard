import * as vscode from 'vscode';
import { BrotliCompress } from 'zlib';

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
		getMyWebviewContent(panel.webview, context).then(html =>panel.webview.html = html);   // <--- HTML
	  })	
	);
}

  async function getMyWebviewContent(webview: vscode.Webview, context: any) : Promise<string> { 
	let html: string = ``;
	let foldersHtml: string = ``;
	
	const myStyle = webview.asWebviewUri(vscode.Uri.joinPath(
		  context.extensionUri, 'media', 'style.css'));   // <--- 'media' is the folder where the .css file is stored
	
	let carrierlist = await renderCarrierList();
	let labelaryData = await getLabelaryData();
	// construct your HTML code
	html += `
			<!DOCTYPE html>
			<html>
				<body>
				From Labelary:
				  <embed width="100%" height="100%" src="data:application/pdf;base64,${labelaryData}" alt="red dot"/> 
				  <object width="100%" height="100%" src="data:application/pdf;base64,${labelaryData}" type="application/pdf" alt="red dot"></object>
				  response='${labelaryData}'
				</body>
			 </html>
	`;
	// -----------------------
	return html;
  }


 async function getLabelaryData(): Promise<string> {

	//   basestring = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
	let basestring = await getPDFFromLabelary();

	  return basestring;
  }

  //see https://bobbyhadz.com/blog/typescript-http-request
  import axios from 'axios';

  
  async function getPDFFromLabelary():Promise<string> {

	let zpl:string = '^xa^cfa,50^fo100,100^fdHello World^fs^xz';


	//const {data:pdf} = await axios.post('http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0', zpl, { headers })
	const {data: pdf} = await axios({
		method: "POST",
		data: zpl,
		url: 'http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0',
			responseType: "arraybuffer",
			responseEncoding: "binary",
			headers:{
				'Content-type': 'application/x-www-form-urlencoded',
				'Accept': 'application/pdf'
			}
		});
	
		const result =  Buffer.from(pdf).toString("base64");
	return result;

};
  
  

  function getBase64(finData:string) {
	
	// let reader = new FileReader();
	// reader.reading(finData);
	// reader.onload = function () {
	//   //me.modelvalue = reader.result;
	//   return reader.result;
	// };
	return finData;
 }
 



  function getCarriers(){
	let folders = ['DHL', 'DPD', 'UPS'];
	return folders;
}


  function buildHtmlTable(myList:any[]) {
    let columns:string[];
    columns=[];
    let res = '<table class="table">';
    let headerTr = '';
  
    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if (!columns.some(x=>x==key)) {
                columns.push(key);
                headerTr+='<th>'+key+'</th>';
            }
        }
    }
    res += "<tr>"+headerTr+"</tr>";
  
    for (var i = 0; i < myList.length; i++) {
      let row = '';
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var cellValue = myList[i][columns[colIndex]];
        if (cellValue == null) cellValue = "";
        row+='<td>'+cellValue+'</td>';
      }
      res += "<tr>"+row+"</tr>";
    }
    res += "</table>";
    return res;
  }

  async function renderCarrierList(): Promise<string> {
	let html: string = ``;
	
	var myList = [
		{ "ID":1, "Carrier": "UPS", "Scenarios":["standard-packages", "multi-package","dg-test"]},
		{ "ID":2, "Carrier": "DHL", "Services":[1,2,4] },
		{ "ID":3, "Carrier": "FED", "Services":["09:00","12:00"] }
	];

	var test = await vscode.workspace.findFiles('**/*.integration.json');

	test.forEach(async element => {
		html += `<li>${element.path}</li>`;

		// Example on reading file
		// let document = await vscode.workspace.openTextDocument(element.path);
		// document.getText();
	});

	html += buildHtmlTable(myList);
	return html;
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

