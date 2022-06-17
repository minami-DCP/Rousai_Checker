//ラジオボタンの属性を取得する関数
let getRadioButton = function(name){
  let result = "";
  //指定されたname属性のラジオボタンを取得
  let elems = document.getElementsByName(name);
  //ラジオボタンを順に走査し、選択状態にあるか判定
  for (let i = 0; i < elems.length; i++){
    if(elems[i].checked){
      result = elems[i].value
    }
  }
  return result;
};

//心理的負荷「中」の問題の状態を取得する関数
function check_Middle(x){
  let v = 0;
  if(getRadioButton(x) === "yes"){
    v = 1;
  }
  return v;
}

//心理的負荷「高」の問題の状態を取得する関数
function check_High(x){
  let v = 0;
  if(getRadioButton(x) === "yes"){
    v = 1;
  }
  return v;
}

//ラジオボタンが選択されていない状態を取得する関数
function judgeBotton(x){
  let v = 0;
  if(getRadioButton(x) == ""){
    v = 1;
  }
  return v;
}

//送信ボタンクリックでラジオボタンの値を取得
document.getElementById("btn").addEventListener("click",function(){
  let countMiddle = 0;
  let countHigh = 0;
  let judgePlaneBotton = 0;


//ここから各問について、yes/no/無選択を判定
//--------------------------------------------------------------
//  ※厚労省のリーフレットに改訂があった際は、ここの部分を書き換える  \
//--------------------------------------------------------------
  //心理的負荷「中」の個数をカウント
  countMiddle += check_Middle("q2");
  judgePlaneBotton += judgeBotton("q2");

  countMiddle += check_Middle("q5");
  judgePlaneBotton += judgeBotton("q5");

  countMiddle += check_Middle("q6");
  judgePlaneBotton += judgeBotton("q6");

  countMiddle += check_Middle("q7");
  judgePlaneBotton += judgeBotton("q7");

  countMiddle += check_Middle("q8");
  judgePlaneBotton += judgeBotton("q8");

  countMiddle += check_Middle("q9");
  judgePlaneBotton += judgeBotton("q9");

  countMiddle += check_Middle("q10");
  judgePlaneBotton += judgeBotton("q10");

  countMiddle += check_Middle("q11");
  judgePlaneBotton += judgeBotton("q11");

  countMiddle += check_Middle("q12");
  judgePlaneBotton += judgeBotton("q12");

  countMiddle += check_Middle("q13");
  judgePlaneBotton += judgeBotton("q13");

  countMiddle += check_Middle("q14");
  judgePlaneBotton += judgeBotton("q14");

  countMiddle += check_Middle("q15");
  judgePlaneBotton += judgeBotton("q15");

  countMiddle += check_Middle("q17");
  judgePlaneBotton += judgeBotton("q17");

  countMiddle += check_Middle("q18");
  judgePlaneBotton += judgeBotton("q18");

  countMiddle += check_Middle("q19");
  judgePlaneBotton += judgeBotton("q19");

  countMiddle += check_Middle("q20");
  judgePlaneBotton += judgeBotton("q20");

  countMiddle += check_Middle("q23");
  judgePlaneBotton += judgeBotton("q23");

  countMiddle += check_Middle("q24");
  judgePlaneBotton += judgeBotton("q24");

  countMiddle += check_Middle("q25");
  judgePlaneBotton += judgeBotton("q25");

  //心理的負荷「強」の個数をカウント
  countHigh += check_High("q1");
  judgePlaneBotton += judgeBotton("q1");

  countHigh += check_High("q3");
  judgePlaneBotton += judgeBotton("q3");

  countHigh += check_High("q4");
  judgePlaneBotton += judgeBotton("q4");

  countHigh += check_High("q16");
  judgePlaneBotton += judgeBotton("q16");

  countHigh += check_High("q21");
  judgePlaneBotton += judgeBotton("q21");

  countHigh += check_High("q22");
  judgePlaneBotton += judgeBotton("q22");

  //セクシュアルハラスメントに関する質問について判定
  let sexualJudge = getRadioButton("sexual_q26");
  if(sexualJudge === "yes1"){
    countMiddle += 1;
  }else if(sexualJudge === "yes2"){
    countHigh += 1;
  }
  judgePlaneBotton += judgeBotton("sexual_q26");

//判定ここまで

//コンソールに出力　※デバッグ用
  console.log("心理的負荷「中」と判断される出来事：" + countMiddle + "個、");
  console.log("心理的負荷「強」と判断される出来事：" + countHigh + "個、");
  console.log("空のボタンの数：" + judgePlaneBotton);
  console.log("セクハラに関する質問の回答：" +sexualJudge);

//送信ボタンの下に結果を表示

  //未入力の箇所がある場合は警告を表示
  let result0 = "※未入力の項目が" + judgePlaneBotton + "個あります。"
  if (judgePlaneBotton > 0){
    keikoku.innerHTML = result0;
  }else{
    keikoku.innerHTML = "";
  };

//未入力の項目がなければ、判定を表示
  if(judgePlaneBotton == 0){
    //詳細な心理的負荷ごとの出来事の個数
    let result1 = "心理的負荷「中」と判断される出来事：" + countMiddle + "個、" +
    "心理的負荷「強」と判断される出来事：" + countHigh + "個"
    result.innerHTML = result1;

    let result2 = "";
    let result3 = "";

    if((countHigh > 0) && (countMiddle >= 3)){
      result2 = "心理的負荷「強」と判断される出来事が存在し、心理的負荷「中」とされる出来事が複数存在するので、";
      result3 = "労災が認定される可能性があります。";
      document.getElementById("finalResult").style.color = "red";
    }else if((countHigh > 0) && (countMiddle < 3)){
      result2 = "心理的負荷「強」と判断される出来事が存在するので、";
      result3 = "労災が認定される可能性があります。";
      document.getElementById("finalResult").style.color = "red";
    }else if((countHigh <= 0) && (countMiddle >= 3)){
      result2 = "心理的負荷「中」とされる出来事が複数存在するので、総合的に心理的負荷「強」と判断され、";
      result3 = "労災が認定される可能性があります。";
      document.getElementById("finalResult").style.color = "red";
    }else{
      result2 = "心理的負荷の強度、および個数が基準値未満ですので、お気の毒ですが、";
      result3 = "労災が認定される可能性は低いと考えられます。";
      document.getElementById("finalResult").style.color = "black";

    }
    reason.innerHTML = result2;
    finalResult.innerHTML = result3;

  };


},false);
