const DisplayData = (result) => {

    let div = document.createElement("div");
    document.getElementById("interface").appendChild(div);
    const newClass = div.classList;
    newClass.add("text");
    document.querySelector(".text").innerHTML = `
    <div class = "data">
    <h2>Word : <span>${result[0].word}</span></h2>
    <p>part Of Speech : <span>${result[0].meanings[0].partOfSpeech}</span></p>
    <p>Meaning : <span>${result[0].meanings[0].definitions[0].definition}</span></p>
    <p>Example : <span>${result[0].meanings[0].definitions[0].example == undefined ? "Example Not Found" : result[0].meanings[0].definitions[0].example}</span></p>
    <p>Synonyms : <span style = "word-wrap: break-word;">${result[0].meanings[0].synonyms == "" || undefined ? "Synonyms Not Found" : result[0].meanings[0].synonyms}</span></p>
    <button id = "linkBtn"><a href="${result[0].sourceUrls}" target="_blank">More Details</a></button>
    </div>
    `;
};


const onclickData = async (searchInput) => {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
    let result = await response.json();
    // console.log(result);
    DisplayData(result);

}

document.getElementById("searchBtn").addEventListener("click", () => {
    const searchInput = document.getElementById("input").value;
    if (searchInput == "") {
        alert("Please Wright Someting")
    }
    else {
        onclickData(searchInput)
    }

});




