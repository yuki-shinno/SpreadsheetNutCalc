//function addList(){
//  var foodtable = SpreadsheetApp.openById('1HgdKR3FuvWbGfqnUNVuK-fKXl9rbqXbcDtMlkGF2iX8');
//  var sh = foodtable.getSheetByName('設定');
//  var ary = sh.getDataRange().getValues();
//  var html = "";
//  for(var i=0;i<ary.length;i++){
//    var id = i + 1;
//    var name = ary[i][2];
//    var unit = ary[i][1];
//    var label = ary[i][0];
//    html += "<li><div class='checkbox'><label><input type='checkbox' id='chk-"+ id + "' value='" + name + "' name='"+ unit + "'/> " + label + "</label></div></li>"
//  }
//  return html;
//}


function 項目行の表示(aryValue,aryName){
  var aryData =[aryValue,aryName];
  var ss = SpreadsheetApp.getActiveSheet();
  var rows = aryData.length;
  var cols = aryData[0].length; ;
  var rng = ss.getActiveRange();
  var ActiveRow = rng.getRow();
  var ActiveCol = rng.getColumn();
  
  //アクティブセルから項目行を表示
  ss.getRange(ActiveRow,ActiveCol,rows,cols).setValues(aryData);
  
  //セル範囲のマージ
  ss.getRange(ActiveRow, ActiveCol, 2).merge();
  ss.getRange(ActiveRow, ActiveCol+1, 2).merge();
  ss.getRange(ActiveRow, ActiveCol+2, 2).merge();
  ss.getRange(ActiveRow, ActiveCol+3, 2).merge();
  
  //垂直方向に結合
  ss.getRange(ActiveRow, ActiveCol, 1, 4).setVerticalAlignment('middle');
  ss.getActiveRange().offset(2, 0).activate();
  //フォントをボールドに
  ss.getRange(ActiveRow, ActiveCol, 2, cols).setFontWeight('bold');
}

function setUserProperty(aryCheckedId){
  var str =""
  for(var i=0;i<aryCheckedId.length ;i++){
    str += aryCheckedId[i] + ",";
  }
  PropertiesService.getUserProperties().setProperty('項目行', str);
  SpreadsheetApp.getUi().alert('項目行を登録しました');
}

function getUserProperty(){
  var userProp = PropertiesService.getUserProperties().getProperty('項目行');
  var aryUserProp = userProp.split(",");
  return aryUserProp;
}

function アクティブセルの取得(){
  var rng = SpreadsheetApp.getActiveSheet().getActiveCell();
  var row =rng.getRow();
  var col =rng.getColumn();
  var aryRowCol =[row,col]
  return(aryRowCol);
}
