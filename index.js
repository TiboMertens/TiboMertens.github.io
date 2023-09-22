// Initialize the HTML audio element for playing audio
const audioPlayer = document.querySelector("#audioPlayer");

// Initialize SpeechRecognition for webkit browsers, prefix
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

// Grammar - the "play" command
const grammar = `#JSGF V1.0; grammar commands; public <command> = play;`;

// Speech recognition settings
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US"; // Change the language code if needed

// Start listening
recognition.start();

// On result, handle the recognized speech
recognition.onresult = function (event) {
  // Get the last recognized speech
  let recognizedSpeech = event.results[event.results.length - 1][0].transcript;

  if (recognizedSpeech.trim().toLowerCase() === "play") {
    // Play the audio
    audioPlayer.play();
  }
};
