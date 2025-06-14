import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail({ user }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${id}/`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error("Ошибка при получении рецепта:", err));
  }, [id]);


  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить рецепт?')) {
      axios.delete(`/api/recipes/${id}/`)
        .then(() => navigate('/'));
    }
  };

  if (!recipe) return <div>Загрузка...</div>;

  return (
    <div className="recipe-detail">
      <div className='recipe-title'>
        <h2>{recipe.title}</h2>
      </div>
      <p><strong>Описание:</strong> {recipe.subject}</p> 
      <p><strong>Продукты:</strong> {recipe.description}</p>
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          style={{ maxWidth: "500px" }} 
        />
      )}

      {recipe.instructions && (
      <>
        <h3>Как готовить:</h3>
        <p>{recipe.instructions}</p>
      </> 

      )}
   {/* Только если пользователь авторизован */}
         {user?.isAuthenticated && (
           <div style={{ marginTop: '20px' }}>
             <Link to={`/edit/${recipe.id}`}>
               <button>Редактировать</button>
             </Link>
             <button onClick={handleDelete}>Удалить</button>
           </div>
         )}
    </div>
  );
}

export default RecipeDetail;
