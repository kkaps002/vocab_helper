let addBtn = document.getElementById("addBtn");
let removeBtn = document.getElementById("removeBtn");
let inputWord = document.getElementById("inputWord");
let inputDefinition = document.getElementById("inputDefinition");
let testCounter = document.getElementById("testCounter");
let clearListBtn = document.getElementById("clearListBtn");
let vocabularyDisplay = document.getElementById("vocabularyDisplay");
let vocabularyTest = document.getElementById("vocabularyTest");
let vocabularyCreator = document.getElementById("vocabularyCreator");
let startTestBtn = document.getElementById("startTestBtn");
let goBackBtn = document.getElementById("goBackBtn");
let wordContainer = document.getElementById("wordContainer");
let usrInput = document.getElementById("usrInput");
let wordSubmit = document.getElementById("wordSubmit");
let resultContainer = document.getElementById("resultContainer");
// ---------------------------------------------------------------------------------

//initialise vocabulary variable / retrieve data from local storage
updateVocabulary();
//hide the test part when loading the page
vocabularyTest.style.display = "none";
// ---------------------------------------------------------------------------------
startTestBtn.addEventListener("click", () => {
    vocabularyTest.style.display = "flex";
    vocabularyCreator.style.display = "none";
    generateNewWord();
});
goBackBtn.addEventListener("click", () => {

    location.reload();

    //vocabularyCreator.style.display = "flex";
    //vocabularyTest.style.display = "none";
    
});
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
let finalScore = 0; //keep track of correct answers for final score

const randomNum = () => {
    return Math.floor(Math.random() * vocabulary.length);
}    
const generateNewWord = () => {
    
        let randomIndex = randomNum();
        //keep track of what words have already been shown to user
        if (indexArr.length === vocabulary.length){
            //when the array of indexes shown to user reaches the same length as
            //the vocabulary array then that means all the words have been shown
            // so Final Score is ready to be displayed an no further input can be taken
            resultContainer.textContent = "Final Score : " + finalScore + "/" + vocabulary.length;
            wordSubmit.disabled = true;
            //remove all other styles and add final score styling
            resultContainer.classList.remove("correct");
            resultContainer.classList.remove("wrong");
            resultContainer.classList.add("finalScore");
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

//generateBtn.addEventListener("click", generateNewWord);

wordSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(`user input:${usrInput.value} , displayed word : ${wordContainer.textContent}`);
    
    if(usrInput.value === ""){
        return; //prevent user from submitting empty string
    }
     else if (usrInput.value === findTranslation(wordContainer.textContent)) {
        //change result box style
        resultContainer.textContent = "Correct !";
        resultContainer.classList.add("correct");
        resultContainer.classList.remove("wrong");
        finalScore ++;
        generateNewWord();
        usrInput.value = "";
    }
    else {
        //store wrong answers
        displayUnpracticedWords(wordContainer.textContent);
        //change result box style
        resultContainer.textContent = "Wrong.";
        resultContainer.classList.add("wrong");
        resultContainer.classList.remove("correct");
        generateNewWord();
        usrInput.value = "";
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


function displayUnpracticedWords(word) {
    console.log("you need to practice this word more: " + word);
}