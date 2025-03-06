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
            displayMeaning(data);
    } catch (error) {
        displayResultDiv.textContent = error.message;
    } finally {
        wordInput.value = '';
    }
};

const displayMeaning = (data) => {
    const wordData = data[0];
    const phonetics = wordData.phonetics
      .map(
        (p) =>
          `<div class="result-item">${p.text} <audio class="result-audio" controls src="${p.audio}"></audio></div>`
      )
      .join("");
    const meanings = wordData.meanings
      .map((meaning) => {
        const definitions = meaning.definitions
          .map((def) => `<li>${def.definition}</li>`)
          .join("");
        return `<div class="result-item"><strong>${meaning.partOfSpeech}</strong><ul>${definitions}</ul></div>`;
      })
      .join("");
  
    displayResultDiv.innerHTML = `
      <h2 class="result-title">${wordData.word}</h2>
      <div>${phonetics}</div>
      <div>${meanings}</div>
      <div class="result-item"><a href="${wordData.sourceUrls[0]}" target="_blank">Source</a></div>
    `;
  };