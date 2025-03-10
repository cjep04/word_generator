
const btn = document.getElementById('btn');
const wordInput = document.getElementById('input');
const displayResultDiv = document.getElementById('result');

btn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (word) {
      getMeaning(word);
    } else {
      displayResultDiv.textContent = "Please enter a word.";
    }
  });


const getMeaning = async (word) => {
    try{
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}
            `);
            if (!response.ok){
                throw new Error('Word not found');
            }
            const data = await response.json();
            console.log(data[0].phonetics);
            displayMeaning(data);
    } catch (error) {
        displayResultDiv.textContent = error.message;
    } finally {
        wordInput.value = '';
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