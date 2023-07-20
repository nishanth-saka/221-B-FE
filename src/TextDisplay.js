import { ReactFragment, useState } from "react";
const TextDisplay = () => {
  const url = "https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=822f0ddcb06e4d17ab2c938617b3b272&sources=google-news-in,the-hindu,the-times-of-india&pageSize=50&q=";
  const [enteredText, setEnteredText] = useState('');
  const [labelText, setlabelText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch =async() => {
    // Perform the search logic based on the searchQuery
    // For example, you can filter an array of data or make an API call
  
    try {
      // Make the API call to your search endpoint
      const response = await fetch(url+enteredText);
 
      let newObject = {};
      let newArticlesArray = [];
      const data = await response.json();
      console.log(response)
      console.log(data)
      data.articles.map((item) => {
        newObject = item;
        newObject.dateTime = new Date(item.publishedAt)
        const currentDate = new Date()
        const difference = currentDate - newObject.dateTime ;

        // Convert milliseconds to days
        const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        newObject.daysAgo =`${differenceInDays} days ago-`
        newArticlesArray.push(newObject)
      })
      setSearchResults(newArticlesArray.sort((a, b) => a.dateTime - b.dateTime));
     

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
    

  const handleButtonClick = () => {
    console.log(enteredText);
    setlabelText(enteredText)
  };

  const handleInputChange = (e) => {
    setEnteredText(e.target.value); 
  };
 

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={handleSearch}>Display</button>
      <label>{labelText}</label>
      <ul>
  {searchResults.map((result, index) => (
    <li key={index}>
            <p>{result.daysAgo}</p>

      <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
      <img src={result.urlToImage} alt={result.title} />
      <p>{result.publishedAt}</p>
      <p>{result.description}</p>
      <p>{result.source.name}</p>
    </li>
  ))}
</ul>
    </div>
  );
};

export default TextDisplay;
