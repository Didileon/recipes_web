import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CategoryRecipes() {
    const { slug } = useParams(); // например: "soups"
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/category/${slug}/`)
            .then(response => {
                setRecipes(response.data.recipes);
                setCategory(response.data.category);
            })
            .catch(error => {
                console.error("Ошибка загрузки рецептов категории:", error);
            });
    }, [slug]);

    return (
        <div>
            <section className='categoryrecipes'>
                <h1>Рецепты категории: {category ? category.name : '...'}</h1>
            </section>

            {recipes.length === 0 ? (
                <p>Нет рецептов в этой категории</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {recipes.map(recipe => (
                        <li key={recipe.id} style={{ marginBottom: '20px' }}>
                            <h3>
                                <Link to={`/recipes/${recipe.id}`} className="recipe-title-link">
                                    {recipe.title}
                                </Link>
                            </h3>
                            <p>{recipe.description}</p>
                            {recipe.image && (
                                <img src={recipe.image} alt={recipe.title} style={{ maxWidth: "300px", borderRadius: "10px" }} />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoryRecipes;
