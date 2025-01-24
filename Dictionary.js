const DisplayData = (result) => {
    // Clear previous results if any
    document.getElementById("output").innerHTML = '';

    // Create a new div to display the data
    const div = document.createElement("div");
    div.classList.add("data");

    // Build the HTML content for displaying the word details
    div.innerHTML = `
        <h2>Word: <span>${result[0].word}</span></h2>
        <p>Part Of Speech: <span>${result[0].meanings[0].partOfSpeech}</span></p>
        <p>Meaning: <span>${result[0].meanings[0].definitions[0].definition}</span></p>
        <p>Example: <span>${result[0].meanings[0].definitions[0].example || "Example Not Found"}</span></p>
        <p>Synonyms: <span style="word-wrap: break-word;">${result[0].meanings[0].synonyms.length > 0 ? result[0].meanings[0].synonyms.join(", ") : "Synonyms Not Found"}</span></p>
        <button id="linkBtn"><a href="${result[0].sourceUrls}" target="_blank">More Details</a></button>
    `;

    // Append the created div to the output section
    document.getElementById("output").appendChild(div);
};

const onclickData = async (searchInput) => {
    try {
        // Fetch data from API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
        
        if (!response.ok) {
            throw new Error("Word not found or API error");
        }
        
        // Parse the response to JSON
        const result = await response.json();
        
        // Display the result
        DisplayData(result);
    } catch (error) {
        // Show an error message if something goes wrong
        document.getElementById("output").innerHTML = `<p style="color: red; text-align: center;">Error: ${error.message}</p>`;
    }
};

// Event listener for search button click
document.getElementById("searchBtn").addEventListener("click", () => {
    const searchInput = document.getElementById("input").value.trim();

    if (searchInput === "") {
        alert("Please write something");
    } else {
        onclickData(searchInput);
    }
});
