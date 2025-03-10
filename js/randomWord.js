

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
    let word = data[0].word;
    const phoneticUK = data[0].phonetics.find ( p => p.audio && p.audio. includes('uk'));

    let phoneticHTML = '';
if (phoneticUK) {
    phoneticHTML =  `<p>Phonetic: ${phoneticUK.text || ''}</p>
    <audio controls src="${phoneticUK.audio}"></audio>`;
}

const partOfSpeech = data[0].meanings[0].partOfSpeech;
const definition = data[0].meanings[0].definitions[0].definition;

const meaningHTML = `
    <h2>${word}</h2>
    ${phoneticHTML}
    <p><strong>${partOfSpeech}</strong>: ${definition}</p>
`;

document.getElementById('result').innerHTML = meaningHTML;

}



 generateBtn.addEventListener('click', fetchWordWithDefinition);



