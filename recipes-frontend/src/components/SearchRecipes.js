import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// function SearchRecipes() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = () => {
//     axios

//         .get('/api/recipes/?search=' + query)
//   .then(response => {
//     setResults(response.data.results); // ✅ берем массив из .results
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

     
//   };

function SearchRecipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/recipe-search/?search=${searchQuery}`);
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <div className="input">
      <h2>Поиск</h2>
    </div>
    
    <div className="inputsearch">
        <input
        className='input1'
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Введите название рецепта"
      />
      <button className='input2' onClick={handleSearch}>Поиск</button>

      {/* <input
        className='input1'
        type="text"
        placeholder="Поиск рецепта..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className='input2' onClick={handleSearch}>Найти</button> */}

      {/* <ul>
        {results.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul> */}

      <ul>
        {results.map((recipe) => (
        <li key={recipe.id}>
           <Link to={`/recipes/${recipe.id}`} className="recipe-title-link">
                {recipe.title}
           </Link>
        </li>
      ))}
      </ul>
    </div>
    </>
  );
}

export default SearchRecipes;