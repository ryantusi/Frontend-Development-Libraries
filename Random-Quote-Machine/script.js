//storing all the quotes in an array with objects representing two attributes, quote and author, respectively
const QUOTES = [
    {
      quote: "Act as if what you do makes a difference. It does.",
      author: "William James"
    },
    {
      quote: "Life is 10% what happens to you and 90% how you react to it.",
      author: "Charles R. Swindoll"
    },
    {
      quote: "Quality is not an act, it is a habit.",
      author: "Aristotle"
    },
    {
      quote: "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
      author: "Samuel Beckett"
    },
    {
      quote: "Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.",
      author: "Norman Vincent Peale"
    },
    {
      quote: "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
      author: "St. Jerome"
    },
    {
      quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
      author: "Thomas A. Edison"
    },
    {
      quote: "It always seems impossible until it's done.",
      author: "Nelson Mandela"
    },
    {
      quote: "If you're going through hell, keep going.",
      author: "Winston Churchill"
    },
    {
      quote: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius"
    },
  ]
  
  //Creating a variable 'url' with the twitter link to tweet
  let url = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22";
  
  //Intial page load function
  window.onload = init;
  
  let i = 0;  //i representing each object in the QUOTES array
  
  //color changings elements
  let element = document.getElementById("ctn");
  let colorInd = 0;
    
  function init(){
    //initialization of text inside "text" and "author"
    document.getElementById("text").innerText = QUOTES[i].quote;  //initial quote text
    document.getElementById("author").innerText = QUOTES[i].author; //initial author text
    
    //concatenating the url link with the encoded text of quote and author
    url += encodeURIComponent(QUOTES[i].quote);
    url += "%22 "
    url += encodeURIComponent(QUOTES[i].author);
    
    //assigning the href attribute of "tweet-quote" with the url
    document.getElementById("tweet-quote").href = url;
    
    //change color
    element.style.animation = "colorCycle 10s linear forward " + (colorInd*10) + "%";
  }
  
  //new-quote function
  function generateQuote(){
    
    //i representing each object in the QUOTES array
    i++;      
    if(i > 9){
      i = 0;    //running the list again
      colorInd = 0;
    }
    
    //assigning next "text" and "author" with respective quotes and authors when button clicked
    document.getElementById("text").innerText = QUOTES[i].quote;
    document.getElementById("author").innerText = QUOTES[i].author;
    
    //re-creating the url with the respective encoded text and author to tweet which is then assigned to href attribute
    url = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22";
    url += encodeURIComponent(QUOTES[i].quote);
    url += "%22 "
    url += encodeURIComponent(QUOTES[i].author);
    document.getElementById("tweet-quote").href = url;
    
    //accessing keyframes
    colorInd++;
    element.style.animation = "colorCycle 10s ease " + (colorInd*10) + "%";
  }
  
  document.getElementById("tweet-quote").href = url;