let form = document.querySelector("form");
let inputBox = document.querySelector("#inputBox");
let searchBtn = document.querySelector("#search");
let result_container = document.querySelector(".result-container");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (inputBox.value == 0) {
    alert("You must enter a word !");
  } else {
    result_container.classList.remove("hide");
    result_container.innerHTML = "Fetching Data...";
  }

  searchWord(inputBox.value);
});

const searchWord = async (word) => {
  try{
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let data = await response.json();
    try {
      let definitions = data[0].meanings[0];
      result_container.innerHTML = `<p><strong>Word :</strong> ${data[0].word}</p>
              <p><i>${definitions.partOfSpeech}</i></p>
               <p><strong>Meaning : </strong>${
                 definitions.definitions[0].definition == undefined
                   ? "<p>Not Found</p>"
                   : definitions.definitions[0].definition
               }</p>
               <p><strong>Example : </strong>${
                 definitions.definitions[0].example == undefined
                   ? "<p>Not Found<p>"
                   : definitions.definitions[0].example
               }</p>
               <p><strong>Antonyms : </strong></p>`;
  
      for (let i = 0; i <= definitions.antonyms.length; i++) {
        result_container.innerHTML += `<span>${definitions.antonyms[i]}</span>,`;
      }
  
      result_container.innerHTML += "<p><strong>Synonyms : </strong></p>";
  
      for (let i = 0; i <= definitions.synonyms.length; i++) {
        result_container.innerHTML += `<span>${definitions.synonyms[i]}</span>,`;
      }
    } catch (error) {
      result_container.innerHTML = "Sorry! we couldn't find data ";
    }
  
    result_container.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  
  }
  catch(err)
  {
     result_container.innerHTML = "Opps! Something went wrong";
  }
 
};
