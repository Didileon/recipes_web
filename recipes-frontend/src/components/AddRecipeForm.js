import React, { useState } from 'react';
import axios from 'axios';

const AddRecipeForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('instructions', instructions);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8000/api/recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Рецепт добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении рецепта', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Категория (ID)" value={category} onChange={e => setCategory(e.target.value)} />
      <textarea placeholder="Инструкция" value={instructions} onChange={e => setInstructions(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddRecipeForm;