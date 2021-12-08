if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Ended");
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";
    let getWord = "";
    var paragraph = document.getElementById("getWord");
    
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript = event.results[i][0].transcript;
        getWord = event.results[i][0].transcript;
        var text = document.createTextNode(getWord + ",");
        paragraph.appendChild(text);
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    document.querySelector("#final").innerHTML = final_transcript ;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  document.querySelector("#start").onclick = () => {
    
    speechRecognition.start();
  };
  document.querySelector("#stop").onclick = () => {
    var paragraph = document.getElementById("getWord");
    var text = document.createTextNode(".");
    paragraph.appendChild(text);
    speechRecognition.stop();
  };
} else {
  console.log("Speech Recognition Not Available");
}

