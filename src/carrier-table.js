"use strict";
// see http://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table
// Builds the HTML Table out of myList.
exports.__esModule = true;
exports.buildHtmlTable = void 0;
var myList = [
    { "name": "abc", "age": 50 },
    { "age": "25", "hobby": "swimming" },
    { "name": "xyz", "hobby": "programming" }
];
function buildHtmlTable(myList) {
    var columns;
    columns = [];
    var res = '<table class="table">';
    var headerTr = '';
    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if (!columns.some(function (x) { return x == key; })) {
                columns.push(key);
                headerTr += '<th>' + key + '</th>';
            }
        }
    }
    res += "<tr>" + headerTr + "</tr>";
    for (var i = 0; i < myList.length; i++) {
        var row = '';
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null)
                cellValue = "";
            row += '<td>' + cellValue + '</td>';
        }
        res += "<tr>" + row + "</tr>";
    }
    res += "</table>";
    return res;
}
exports.buildHtmlTable = buildHtmlTable;
console.log(buildHtmlTable(myList));
