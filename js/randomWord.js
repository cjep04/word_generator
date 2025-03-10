
// JavaScript
const randomBtn = document.getElementById('randomBtn');
const displayResultDiv = document.getElementById('result');
const wordInput = document.getElementById('wordInput'); // This is only used in your finally block

randomBtn.addEventListener('click', () => {
  fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then((response) => response.json())
    .then((data) => {
      const randomWord = data[0];
      console.log("Random Word:", randomWord);
      getMeaning(randomWord);
    })
    .catch((error) => {
      displayResultDiv.textContent = "⚠️ Random Word API fetch failed";
      console.log("Random Word API Error:", error);
    });
});

const getMeaning = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error('Word not found');
    }
    const data = await response.json();
    console.log(data[0].phonetics);
    displayMeaning(data);
  } catch (error) {
    displayResultDiv.textContent = "⚠️ Dictionary error: " + error.message;
    console.log("Dictionary API Error:", error.message);
  } finally {
    wordInput.value = ''; // Optional, not really needed here
  }
};

const displayMeaning = (data) => {
  const wordData = data[0];

  const britishPhonetic = wordData.phonetics.find(
    (p) => p.audio && p.audio.includes("uk")
  );

  let phoneticsHTML = "";
  if (britishPhonetic) {
    phoneticsHTML = `<div class="result-item">${britishPhonetic.text || ""} 
      <audio class="result-audio" controls src="${britishPhonetic.audio}"></audio></div>`;
  }

  const firstMeaning = wordData.meanings[0];
  const partOfSpeech = firstMeaning.partOfSpeech;
  const firstDefinition = firstMeaning.definitions[0].definition;

  const meaningHTML = `<div class="result-item"><strong>${partOfSpeech}</strong><p>${firstDefinition}</p></div>`;

  displayResultDiv.innerHTML = `
    <h2 class="result-title">${wordData.word}</h2>
    <div>${phoneticsHTML}</div>
    <div>${meaningHTML}</div>
    <div class="result-item"><a href="${wordData.sourceUrls[0]}" target="_blank">Source</a></div>
  `;
};
