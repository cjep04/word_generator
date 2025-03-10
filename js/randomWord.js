

const generateBtn = document.getElementById('generateBtn');
const resultsDisplay = document.getElementById('resultDisplay');

if (!generateBtn || !resultsDisplay){
    console.log("Error located in the DOM");
}



async function fetchRandomWord() {
    try{
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1')
        if (!response.ok){
            throw new Error('Network response was not OK');
        }
        const data = await  response.json();
        return data[0];
        } catch (error){
            console.log('Error fetching data from the API:', error.message);
            return null; // fallback in case of error
        };

    }

    
    


async function fetchWordWithDefinition() {
    let success = false;
    while (!success){
            try{
                const word = await fetchRandomWord()
                console.log(`Trying word: ${word}`);
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                    if (!response.ok){
                        throw new Error ('No definition found'); 
                    }

                    const data = await response.json();
                    displayMeaning(data);
                    success = true;
                

            } catch (error){
            console.log("No definition found, retrying...");
        } 
    }
}

function displayMeaning(data) {
    try {
      const word = data[0]?.word || "Unknown word";
      const partOfSpeech = data[0]?.meanings?.[0]?.partOfSpeech || "N/A";
      const definition = data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition available.";
  
      const meaningHTML = `
        <h2>${word}</h2>
        <p><strong>${partOfSpeech}</strong>: ${definition}</p>
      `;
  
      document.getElementById('result').innerHTML = meaningHTML;
    } catch (err) {
      console.error("Error displaying meaning:", err);
      document.getElementById('result').innerHTML = `<p>Oops! Couldn't display the word meaning.</p>`;
    }
  }
  



 generateBtn.addEventListener('click', fetchWordWithDefinition);


 function displayMeaning(data) {
    try {
      const word = data[0]?.word || "Unknown word";
      const partOfSpeech = data[0]?.meanings?.[0]?.partOfSpeech || "N/A";
      const definition = data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition available.";
  
      const meaningHTML = `
        <h2>${word}</h2>
        <p><strong>${partOfSpeech}</strong>: ${definition}</p>
      `;
  
      const resultDiv = document.getElementById('result');
      
      // Reset any existing animation class (in case of multiple clicks)
      resultDiv.classList.remove('result-animate');
      void resultDiv.offsetWidth; // Trigger reflow to restart animation
  
      resultDiv.innerHTML = meaningHTML;
      resultDiv.classList.add('result-animate');
    } catch (err) {
      console.error("Error displaying meaning:", err);
      document.getElementById('result').innerHTML = `<p>Oops! Couldn't display the word meaning.</p>`;
    }
  }
  


//Share Button
  shareBtn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Check out this cool design!',
          url: window.location.href
        });
        console.log('Shared successfully!');
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert('Web Share not supported on this device. Try copying the link instead.');
    }
  });
