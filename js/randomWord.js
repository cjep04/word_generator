// JavaScript
const randomBtn = document.getElementById('randomBtn');
const displayResultDiv = document.getElementById('result');
const wordInput = document.getElementById('wordInput'); // Optional use

// Event listener for button click
randomBtn.addEventListener('click', () => {
  fetchWordWithDefinition();
});

// Helper: fetch a random word
const fetchRandomWord = async () => {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log("Random Word API Error:", error);
    displayResultDiv.textContent = "⚠️ Failed to fetch random word.";
    throw error;
  }
};

// Main logic: keep trying until a word with a definition is found
const fetchWordWithDefinition = async () => {
  let success = false;

  while (!success) {
    const word = await fetchRandomWord();
    console.log("Trying word:", word);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) throw new Error('No definition found');
      const data = await response.json();
      displayMeaning(data);
      success = true;
    } catch (error) {
      console.log("No definition found for:", word, "Retrying...");
    } finally {
      wordInput.value = '';
    }
  }
};

// Display meaning data
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

