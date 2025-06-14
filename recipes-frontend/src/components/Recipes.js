import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/recipes/") // Убедитесь, что ваш сервер Django запущен
            .then(res => {
                console.log(res.data);
                setRecipes(res.data.results); // Здесь просто используем полученные данные
            })
            .catch(error => {
                console.error("Error fetching the recipes: ", error);
            });
    }, []);

    return (
        <div>
            <section className='recipes'>
                <h1>Рецепты</h1>
            </section>

            <div className="recipe-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-item" style={{ border: '1px solid #ccc', padding: '10px' }}>
                    <h3>
                        <Link to={`/recipes/${recipe.id}`} className="recipe-title-link">
                        {recipe.title}
                        </Link>
                    </h3>
                    <p>{recipe.description}</p>
                    <p>
                        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: "300px" }} />
                    </p>
                    <p>Категория: {recipe.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recipes;


