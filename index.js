// Initialize the HTML audio element for playing audio
const audioPlayer = document.querySelector("#audioPlayer");

// Initialize SpeechRecognition for webkit browsers, prefix
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

// Grammar - the "play" command
const grammar = `#JSGF V1.0; grammar commands; public <command> = play | stop;`;

// Speech recognition settings
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US"; // Change the language code if needed

// Voeg een variabele toe om bij te houden of de audio aan het afspelen is
let isPlaying = false;

// In de event handler, controleer zowel "play" als "stop" opdrachten
recognition.onresult = function (event) {
  // Get the last recognized speech
  let recognizedSpeech = event.results[event.results.length - 1][0].transcript;

  if (recognizedSpeech.trim().toLowerCase() === "play") {
    if (!isPlaying) {
      // Speel de audio af als deze niet al aan het afspelen is
      audioPlayer.play();
      isPlaying = true;
    }
  } else if (recognizedSpeech.trim().toLowerCase() === "stop") {
    if (isPlaying) {
      // Stop de audio als deze aan het afspelen is
      audioPlayer.pause();
      audioPlayer.currentTime = 0; // Terug naar het begin van het nummer
      isPlaying = false;
    }
  }
};

// Start listening
recognition.start();
