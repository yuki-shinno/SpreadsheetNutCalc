function addMealBySheet() {
  //  料理一覧シートのIDを取得
  var mealId =  PropertiesService.getUserProperties().getProperty('mealId');  
  if(mealId == null){ //IDが無い場合
    var ssMealCopy = SpreadsheetApp.openById('14_Iv5GMbFd3RNQBKD-dfbZ2wZsVoepWIo9O0mr2-NDM');
    var ssMeal = ssMealCopy.copy('SNC_料理一覧');
    var mealId = ssMeal.getId();
    PropertiesService.getUserProperties().setProperty('mealId', mealId); //IDの登録
    showMsgBox('マイドライブに「SNC_料理一覧」のシートを作成しました。\nそのシートから料理を登録してください。')
  }else{ //IDがある場合
    var ssMeal = SpreadsheetApp.openById(mealId);
  }
  //料理名を取得しJSに渡す
  var sheets = ssMeal.getSheets();
  var sheetsName = [];
  for(var i=1;i<sheets.length;i++){
    sheetsName.push(sheets[i].getName());
  }
  return sheetsName;
}

function gotoMealSheet(){
  var url =  getMealSheetURL();
  return "<a href='" + url + "'>料理を登録する</a>";
}

function getMealSheetURL(){
  var mealId =  PropertiesService.getUserProperties().getProperty('mealId');  
  var ssMeal = SpreadsheetApp.openById(mealId);
  var url = ssMeal.getUrl();
  return url;
}
function addMealToSheet(mealName){
  var mealId =  PropertiesService.getUserProperties().getProperty('mealId');
  var ssMeal = SpreadsheetApp.openById(mealId);
  var sheets = ssMeal.getSheets();
  for(var i=0;i<sheets.length;i++){
    //シート名と料理名が同じ場合、シートの2行目から最終行まで取得し、選択行にペースト
    if(sheets[i].getSheetName()==mealName){
      var ss = SpreadsheetApp.getActiveSheet();
      var activeCell = ss.getActiveCell();
      var activeRow = activeCell.getRow();
      var data = ss.getDataRange().getValues();
      var mealNameRowCol = getSerchRowCol(data,'[SNC.料理名]');
      var foodNumberRowCol = getSerchRowCol(data,'[SNC.食品番号]');
      var foodNameRowCol = getSerchRowCol(data,'[SNC.食品名]');
      var weightRowCol = getSerchRowCol(data,'[SNC.重量]');
      var ret = "true";
      //項目行が見つからない場合は処理を中断
      if(foodNumberRowCol == ''){
        var ui = SpreadsheetApp.getUi();
        ret = "not found";
        return ret;
      }
      //アクティブセルのrowがタイトル行よりも上の場合、メッセージボックスを表示、処理を中断
      if(activeRow < foodNumberRowCol[0]+2){
        var ui = SpreadsheetApp.getUi();
        ret = "under";
        return ret;
      }
      if(ret=='true'){
        var activeRow = ss.getActiveCell().getRow();
        var mealNameIndex = 0;
        var foodNumIndex = 1;
        var foodNameIndex = 2;
        var weightIndex = 3;
        var values =  sheets[i].getRange(3,1, sheets[i].getLastRow()-2,4).getValues();
        for(var i=0;i<values.length;i++){ //料理リストの行数だけループを回す
          ss.getRange(activeRow + i, mealNameRowCol[1]).setValue(values[i][mealNameIndex]);
          ss.getRange(activeRow + i, foodNumberRowCol[1]).setValue(values[i][foodNumIndex]);
          ss.getRange(activeRow + i, foodNameRowCol[1]).setValue(values[i][foodNameIndex]);
          ss.getRange(activeRow + i, weightRowCol[1]).setValue(values[i][weightIndex]);            
        }
        return ret;
      }
    }
  }
}
