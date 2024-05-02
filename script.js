const customVocabulary = [
    // {english: "car",
    //  german: "das Auto"},
    // {english: "bed",
    //  german: "das Bett"},
    // {english: "kitchen",
    //  german: "die Küche"},
    //  {english: "radio",
    //  german: "das Radio"},
    //  {english: "chair",
    //  german: "der Stuhl"},
    //  {english: "clock",
    //  german: "die Uhr"},
    //  {english: "similar",
    //  german: "änlich"},
    //  {english: "comfortable",
    //  german: "bequem"},
    //  {english: "honest",
    //  german: "ehrlich"},
    //  {english: "broken",
    //  german: "kaputt"},
    //  {english: "empty",
    //  german: "leer"},
    //  {english: "happy",
    //  german: "lustig"},
    //  {english: "practical",
    //  german: "praktisch"} 
]; 

// uncomment to fill local storage with dummy data
//localStorage.setItem("customVocabulary", JSON.stringify(customVocabulary));

// ---------------------------------------------------------------------------------
let addBtn = document.getElementById("addBtn");
let removeBtn = document.getElementById("removeBtn");
let inputWord = document.getElementById("inputWord");
let inputDefinition = document.getElementById("inputDefinition");
let testCounter = document.getElementById("testCounter");
let clearListBtn = document.getElementById("clearListBtn");
let vocabularyDisplay = document.getElementById("vocabularyDisplay");

let generateBtn = document.getElementById("generateBtn");
let wordContainer = document.getElementById("wordContainer");
let usrInput = document.getElementById("usrInput");
let wordSubmit = document.getElementById("wordSubmit");
let resultContainer = document.getElementById("resultContainer");
// ---------------------------------------------------------------------------------

//initialise vocabulary variable / retrieve data from local storage
updateVocabulary();

// ---------------------------------------------------------------------------------


addBtn.addEventListener("click", () => {
    let word = inputWord.value;
    let definition = inputDefinition.value;

    //check for empty strings
    if(word === "" || definition === ""){
        console.log("no empty strings");
        return;
    }


    //add conditional to check for duplicates!!!!!!!!!!!!!!!!!!
    
    let tempArray = JSON.parse(localStorage.customVocabulary);
    tempArray.push({"english":word,"german":definition});
    let updatedVocab = tempArray;

    //save the vocabulary array in local storage
    localStorage.setItem("customVocabulary", JSON.stringify(updatedVocab));
    //update vocabulary variable with newData
    updateVocabulary();
});

removeBtn.addEventListener("click", () => {
    let tempArray = JSON.parse(localStorage.customVocabulary);
    tempArray.pop();
    let updatedVocab = tempArray;
    //save the vocabulary array in local storage
    localStorage.setItem("customVocabulary", JSON.stringify(updatedVocab));
    //update vocabulary variable with newData
    updateVocabulary();
});

clearListBtn.addEventListener("click", () => {
    localStorage.clear();
    updateVocabulary();
});
// ---------------------------------------------------------------------------------

let indexArr = []; //array that stores index of words that have been shown 
let testCount = 0; //keep track of how many words are left

const randomNum = () => {
    return Math.floor(Math.random() * vocabulary.length);
}
    
const generateNewWord = () => {
    
        let randomIndex = randomNum();
        //keep track of what words have already been shown to user
        if (indexArr.length === vocabulary.length){
            return;
        }
        else if(indexArr.includes(randomIndex)){
            generateNewWord(); //keep calling the function until unused number is given
        }
        else {
            indexArr.push(randomIndex); //story used index value
            console.log(indexArr);
            wordContainer.textContent = vocabulary[randomIndex].english;
            testCount ++;
            testCounter.textContent = testCount + "/" +vocabulary.length;
        }
    
}
generateBtn.addEventListener("click", generateNewWord);

wordSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(`user input:${usrInput.value} , displayed word : ${wordContainer.textContent}`);
    if (usrInput.value === findTranslation(wordContainer.textContent)) {
        resultContainer.textContent = "Correct!"
        //if correct provide new word 
        generateNewWord();
    }
    else {
        //wrong answer does not generate new word
        resultContainer.textContent = "Wrong."
    }
});

//function that takes in an english word and returns an associated german word
const findTranslation = (englishWord) => {
    
    //find the english word in the vocabulary
    const found = vocabulary.find((word) => word.english === englishWord);
    //for debugging
    if (found === undefined){
        console.log("english word does not exist");
        return;
    }
    //return the translation
    console.log("translation: " + found.german);
    return found.german;
}

// ---------------------------------------------------------------------------------
//UPDATE VOCABULARY FUNCTION
function updateVocabulary() {

    // if there is no data stored initialise with empty array
    if (localStorage.customVocabulary === undefined){
        let emptyVocab = [];
        localStorage.setItem("customVocabulary", JSON.stringify(emptyVocab))
        vocabulary = JSON.parse(localStorage.customVocabulary);
        console.log(vocabulary);
        updateVocabularyDisplay();
    }
    else {
        vocabulary = JSON.parse(localStorage.customVocabulary);
        console.log(vocabulary);
        updateVocabularyDisplay();
    }

    
}

function updateVocabularyDisplay() {

        //reset the display to avoid appending already existing words
        vocabularyDisplay.textContent = "";
        let previousWordList = document.getElementsByClassName("listItem");

        for(let i = 0; i < previousWordList.length; i++){
            previousWordList[i].remove();
        }
    
    for(let i = 0; i < vocabulary.length;i++){
        let listItem = document.createElement("li");
        listItem.setAttribute("class","listItem");
        listItem.textContent = vocabulary[i].english + ": " + vocabulary[i].german;
        vocabularyDisplay.append(listItem);
    }
}

