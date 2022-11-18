var flagList1 = new Array("germany","netherlands","ireland","norway","uae","japan","indonesia","australia","finland","moldova","greece","india","singapore","botswana","russia","latvia","usa","bhutan","malta","cuba","seychelles","portugal","liechtenstein","colombia","azerbaijan");
var flagList2 = new Array("belgium","luxembourg","italy","iceland","jordan","bangladesh","poland","new-zealand","sweden","romania","uruguay","niger","turkey","argentina","slovenia","austria","liberia","sri-lanka","monaco","puerto-rico","congo","belarus","haiti","ecuador","armenia");

var flagListnl1 = new Array("duitsland","nederland","ierland","noorwegen","vae","japan","indonesië","australië","finland","moldavië","griekenland","india","singapore","botswana","rusland","letland","vs","bhutan","malta","cuba","seychellen","portugal","liechtenstein","colombia","azerbeidzjan");
var flagListnl2 = new Array("belgië","luxemburg","italië","ijsland","jordanië","bangladesh","polen","nieuw-zeeland","zweden","roemenië","uruguay","niger","turkije","argentinië","slovenië","oostenrijk","liberia","sri-lanka","monaco","puerto-rico","congo","wit-rusland","haiti","ecuador","armenië");

var quizIndex = new Array(flagList1.length);
var questionListIndex = [];
var counter = -1;
var score = 0;
var correctMsg = "Thats Correct :)";
var incorrectMsg = "Sorry, thats not correct :(";
var selectedlang = "";
var correctMsgnl = "Dat klopt :)";
var incorrectMsgnl = "Sorry, dat klopt niet";

function onPageLoad() {
      
    document.getElementById("1").src = "./img/eng.png";
    document.getElementById("2").src = "./img/nl.png";
    document.getElementById("startButton").style.visibility = "hidden";
    //document.getElementById("ques").innerHTML = "Are you ready??";
    setUpQuizFlagIndex();

}

function quizNext()
{
    setAudioImage(selectedlang);
    
    document.getElementById("1").style.visibility = "visible";
    document.getElementById("2").style.visibility = "visible";
    document.getElementById("1").disabled = false;
    document.getElementById("2").disabled = false;
    var countryAudio1 = document.getElementById("countryAudio1");
    var countryAudio2 = document.getElementById("countryAudio2");
    document.getElementById("startButton").style.visibility = "hidden";

    if(selectedlang=="en") {
    if(quizIndex[counter]==1) {
        playAudio(countryAudio1);
        document.getElementById("ques").innerHTML = "Which flag is for "+flagList1[questionListIndex[counter]].toUpperCase();
    } else if(quizIndex[counter]==2) {
        playAudio(countryAudio2);
        document.getElementById("ques").innerHTML = "Which flag is for "+flagList2[questionListIndex[counter]].toUpperCase();
    }
    } else if(selectedlang=="nl") {
        if(quizIndex[counter]==1) {
            playAudio(countryAudio1);
            document.getElementById("ques").innerHTML = "Welke van deze vlaggen is voor "+flagListnl1[questionListIndex[counter]].toUpperCase();
        } else if(quizIndex[counter]==2) {
            playAudio(countryAudio2);
            document.getElementById("ques").innerHTML = "Welke van deze vlaggen is voor "+flagListnl2[questionListIndex[counter]].toUpperCase();
        }
    }
    document.getElementById("centerImg").className = "smallImage";
    document.getElementById("centerImg").src= "./img/buttons/leftright.png";
    document.getElementById("centerImg").style.visibility = "visible";

}

function checkAnswer(imgId) {

    if(counter ==-1){
        
        document.getElementById("1").style.visibility = "hidden";
        document.getElementById("2").style.visibility = "hidden";
        if(imgId==1) {
            selectedlang = "en";
            document.getElementById("ques").innerHTML = "On each page, please select the flag of the country whose name is spoken.";
            document.getElementById("announce").src ="./sounds/other/engInstruction.mp3";
        } else {
            selectedlang = "nl";
            document.getElementById("ques").innerHTML = "Klik op de vlag van het land waarvan de naam wordt gesproken";
            document.getElementById("announce").src ="./sounds/other/dutchinstruction.m4a";
            
        }
        document.getElementById("announce").play();
        counter++;
        setTimeout(function() {
            document.getElementById("startButton").style.visibility = "visible";
          }, 3000);
       
        return;
    }



    document.getElementById("1").disabled = true;
    document.getElementById("2").disabled = true;

    if(imgId==quizIndex[counter]) {
        document.getElementById("centerImg").src= "./img/gifs/correct.gif";
    } else {
        document.getElementById("centerImg").src= "./img/gifs/incorrect.gif";
    }
    document.getElementById("centerImg").className = "centerImage50";

    if(selectedlang=="en") {
        if(imgId==quizIndex[counter]) {
            document.getElementById("ques").innerHTML = correctMsg;
            document.getElementById("announce").src = "./sounds/correct.mp3";
            score++;
        
        } else {
            document.getElementById("ques").innerHTML = incorrectMsg;
            document.getElementById("announce").src = "./sounds/incorrect.mp3";
            
        }
    } else {
        if(imgId==quizIndex[counter]) {
            document.getElementById("ques").innerHTML = correctMsgnl;
            document.getElementById("announce").src = "./sounds/correctnl.m4a";
            score++;
        
        } else {
            document.getElementById("ques").innerHTML = incorrectMsgnl;
            document.getElementById("announce").src = "./sounds/incorrectnl.m4a";
            
        }
    }
    document.getElementById("announce").play();

    counter++; 
    if(counter>=questionListIndex.length) {
        if(selectedlang=="en"){
            document.getElementById("ques").innerHTML = "Your Score is: "+score+" out of "+counter;
        } else {
            document.getElementById("ques").innerHTML = "Je Score is: "+score+" op "+counter;
        }
        document.getElementById("cueImg").className = "bigImage";
        if(score < 3) {
            document.getElementById("centerImg").src = "./img/gifs/babyangry.gif";
        } else if(score < 5) {
            document.getElementById("centerImg").src = "./img/gifs/babyangry1.gif";
        } else if(score <= 7) {
            document.getElementById("centerImg").src = "./img/gifs/GoodJob.gif";    
        } else if(score > 7) {
            document.getElementById("centerImg").src = "./img/gifs/babystrong.gif";
            document.getElementById("cueImg").src = "./img/buttons/happySpideyDance.gif";
            document.getElementById("cueImg").style.visibility = "visible";
        }
        document.getElementById("1").style.visibility = "hidden";
        document.getElementById("2").style.visibility = "hidden";
        document.getElementById("centerImg").className = "bigImage";
        document.getElementById("startButton").style.visibility = "hidden"; 
    } else {
        setTimeout(function() {
            document.getElementById("startButton").style.visibility = "visible";
          }, 1200);
       
    }
    
}

function playAudio(audioTag) {
    audioTag.play();
}


function setUpQuizFlagIndex() {

    for(index=0; index<flagList1.length; index++) {
        quizIndex[index]= randomIntFromInterval(1,2);
    }

    while(questionListIndex.length < 10){
        var r = Math.floor(Math.random() * (flagList1.length-1)) + 0;
        if(questionListIndex.indexOf(r) === -1) questionListIndex.push(r);
    }

 }

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function setAudioImage(selLang) {
    
    document.getElementById("cueImg").style.visibility = "hidden";
    //document.getElementById("startButton").style.visibility = "hidden";
    
    
    if (counter<questionListIndex.length) {
        setFlagImages(counter);
        setFlagAudio(counter,selLang);

    }
    
  }

  

  function setFlagImages(index) {
    document.getElementById("1").src="./img/flags/"+flagList1[questionListIndex[index]]+".png";
    document.getElementById("2").src="./img/flags/"+flagList2[questionListIndex[index]]+".png";
    
  }

  function setFlagAudio(index,selLang) {
      if(selLang=="en") {
        document.getElementById("countryAudio1").src="./sounds/"+flagList1[questionListIndex[index]]+".mp3";
        document.getElementById("countryAudio2").src="./sounds/"+flagList2[questionListIndex[index]]+".mp3";
      } else {
        document.getElementById("countryAudio1").src="./sounds/"+flagList1[questionListIndex[index]]+selLang+".mp3";
        document.getElementById("countryAudio2").src="./sounds/"+flagList2[questionListIndex[index]]+selLang+".mp3";
      }




  }