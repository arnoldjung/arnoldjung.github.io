let keydownKeys = new Set()
let keyupKeys = new Set()
let comboMap = new Map()
function handleKeydown(e) {
    keydownKeys.add(e.key)
    if(e.key == 'q') {
        resetKeys()
    }
    else {
        keydownKeys.add(e.key)
    }
}

function resetKeys() {
    keydownKeys = new Set();
    keyupKeys = new Set()
}
function handleKeyup(e) {
    if(e.key == 'q') {
        resetKeys()
    }
    else {
        keyupKeys.add(e.key)
        if(keydownKeys.size == keyupKeys.size) {
            console.log(getWord(keyupKeys)) 
            resetKeys()
        }
    }
}
    function sortString(text) {
        return text.split('').sort().join('');
    };
function getWord(chord) {
    console.log("lookup: " + chord)
  let key = sortString( Array.from(chord).join(""))
  console.log("key: " + key)
  let word
  if(comboMap.has(key)) {
      word = comboMap.get(key)
      console.log(word)
  }
    else {
        word = "NOT FOUND(" + key + ")";
    }
      let wordNode = document.createTextNode("\n"+word)
   document.getElementById("output").appendChild(wordNode)  
}

async function loadDictionary() {

    function addWord(word) {
        let sorted = sortString(word)
        comboMap.set(sorted, word)
    }
    await fetch("corncob_lowercase.txt")
    .then(async response => {
        console.log(response)
        let text = await response.text()
        for(let line of text.split("\n")){
            addWord(line.trim())    
        }
        console.log("done load")
        
    }
         )

    
}
async function addChordInput(inputId) {
    loadDictionary()
    var elem = document.getElementById(inputId)
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyup)
}
