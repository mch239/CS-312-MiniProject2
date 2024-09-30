import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express(); 
const port = 3000;

//I put in the Programming category avoid any offensive jokes that may appear.
const API_URL = 'https://v2.jokeapi.dev/joke/Programming';

//I have to code in the neccessary functions to convert the name parameter into a joke. 

function userNameAsNumber(name) {
  name = name.toLowerCase()
  let result = 0;

  for (let i = 0; i < name.length; i++ ){
      result += name.charCodeAt(i);
  }
}
return result % 345;
//this puts in place a boundary on id length aka the range of jokes


//Function to find only the safe jokes to share, there are some rather inappropriate ones in the mix. 
function findSafeJoke(jokes) {
  let result = null; 
  for (const joke of jokes) {
    if(joke.safe === true)  {
        result = joke;
    }
  }
  if (!result) {
      return jokes[0];
  }
  return result;
}

//Formatting the layout of the Jokes so it does not look exactly like the output on the site
function formatJoke(input) {
  if (input.joke && input.joke.includes('\n')) {
    input.joke = input.joke.split('\n').join('<br>');
  }

  if (input.setup){
    if (input.setup.includes('\n')) {
      input.setup = input.setup.split('\n').join('<br>');
    }
    else if (input.delivery.includes('\n')) {
      input.delivery = input.delivery.split('\n').join('<br>');
    }
  }
  return input;
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

//This is where I link the API url to my homepage

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });