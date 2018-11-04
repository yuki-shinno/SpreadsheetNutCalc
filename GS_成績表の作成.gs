function addResultTable(res) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var rowStart1 = 8; var rowEnd1 = 13;
  var rowStart2 = 15; var rowEnd2 = 17;
  var rowStart3 = 19; var rowEnd3 = 22;
  var colStartDR = 4;
  var colStartIntake = 6
  
  var myData = onStart();
  
  var colFoodNumber = res[0];
  var colWeight = res[1];
  var rowStart = res[2];
  var LastRow = res[3];
  var rowSum = res[4];
  var isResChk = res[5];
  var isResTabChk = res[6];
  var name = res[7];
  var age = res[8];
  var heightCM = res[9];
  var weight = res[10];
  var sex = res[11];

  //各種設定
  var ui = SpreadsheetApp.getUi();
  var rng = ss.getActiveCell();
  var data = ss.getDataRange().getValues();
  
  //成績表のコピーが存在している場合に削除する
  var sheets = ss.getSheets();
  for(var i=0;i<sheets.length;i++){
    if(sheets[i].getName() == "成績表 のコピー"){
      ss.deleteSheet(sheets[i]);
    }
  }

  var shOld = ss.getSheetByName("成績表");
  var shNew = shOld.copyTo(ss); 
  shNew.activate();
  
  //値の受取
  var heightM = heightCM / 100;
  var BMI = (weight / heightM / heightM).toFixed(1);
  var intake = [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300];
  
  //基本情報の設定
  var str1 = "氏名：" + name + "　　年齢：" + age + "歳　　"　+ "性別："　+ sex;
  var str2 = "身長：" + heightCM + "cm　　体重：" + weight + "kg" + "　　BMI：" + BMI;
  shNew.getRange(3, 1).setValue(str1);
  shNew.getRange(4, 1).setValue(str2);
  
  //摂取基準の範囲の取得
  var aryData = ss.getSheetByName('食事摂取基準 一覧').getDataRange().getValues();
  
  //共通アドレスの取得
  var age = ageTrans(age);
  var address1 =age + sex;
  var aryValue = [];
  
  //変数の定義
  var aryNut1 = [
  '21.カルシウム','21.カルシウム','24.鉄','24.鉄','37.レチノール活性当量','37.レチノール活性当量',
  '44.ビタミンB1','44.ビタミンB1','45.ビタミンB2','45.ビタミンB2','52.ビタミンC','52.ビタミンC'];
  var aryDR1 = ['EAR','RDA','EAR','RDA','EAR','RDA','EAR','RDA','EAR','RDA','EAR','RDA'];
  
  var aryNut2 = ["17.食物繊維総量","20.カリウム","53.食塩相当量"];
  var aryDR2 = ["DG","DG","DG"];
  
  var aryNut = [aryNut1,aryNut2];
  var aryDR = [aryDR1,aryDR2];
  
  //データの検索
  for(var i=0;i<aryNut.length;i++){ //2つの項目を繰り返す
    for(var j=0;j<aryNut[i].length;j++){//１つの項目内栄養素の数だけ繰り返す
      var address2 = aryNut[i][j] + aryDR[i][j];
      var address = address1 + address2;
      for(var k=0;k<aryData.length;k++){//検索するデータの行数分だけ繰り返す
        if(aryData[k][0] == address){
          aryValue.push(aryData[k][5])
        }
      }
    } 
  }
  
  //成績表にデータを入力する
  var cnt = 0 
  
  for(var i=rowStart1;i<rowEnd1+1;i++){
    for(var j=colStartDR;j<colStartDR+2;j++){
      shNew.getRange(i, j).setValue(aryValue[cnt]); 
      cnt++
    }
  }
  for(var i=rowStart2;i<rowEnd2+1;i++){
    shNew.getRange(i,colStartDR).setValue(aryValue[cnt]); 
    cnt++
  }
  
  //成績表に摂取量を入力する
  var cnt = 0;
  for(var i=rowStart1;i<rowEnd1+1;i++){
    shNew.getRange(i, colStartIntake).setValue(intake[cnt]);
    cnt++
  }
  for(var i=rowStart2;i<rowEnd2+1;i++){
    shNew.getRange(i, colStartIntake).setValue(intake[cnt]);
    cnt++
  }
  for(var i=rowStart3;i<rowEnd3+1;i++){
    shNew.getRange(i, colStartIntake).setValue(intake[cnt]);
    cnt++
  }
}

function ageTrans(age) {
  switch(true){
    case age <= 2:
      var ageTrans = "1～2（歳）";
      break;
    case age <= 5:
      var ageTrans = "3～5（歳）";
      break;
    case age <= 7:
      var ageTrans = "6～7（歳）";
      break;
    case age <= 9:
      var ageTrans = "8～9（歳）";
      break;
    case age <= 11:
      var ageTrans = "10～11（歳）";
      break;
    case age <= 14:
      var ageTrans = "12～14（歳）";
      break;      
    case age <= 17:
      var ageTrans = "15～17（歳）";
      break;
    case age <= 29:
      var ageTrans = "18～29（歳）";
      break;
    case age <= 49:
      var ageTrans = "30～49（歳）";
      break;
    case age <= 69:
      var ageTrans = "50～69（歳）";
      break;
    case age >= 70:
      var ageTrans = "70以上（歳）";
      break;
    default:
      var ageTrans = "Err";
      break;
  }
  return ageTrans;
}




