import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios 
            .get('http://127.0.0.1:8000/api/categories/')
            .then(res => {
                console.log(res.data);
                // Простая проверка: если есть длина и это не null/undefined
                if (res.data && typeof res.data.length === 'number') {
                    setCategories(res.data);
                } else {
                    console.error('Ожидался массив категорий, но получено:', res.data);
                    setCategories(res.data.results);
                }
            })
            .catch(error => {
                console.error("Ошибка при загрузке категорий", error);
                setCategories([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка категорий...</p>;


    return (
        <div className="categories-page">
            <div className="title"><h2>Категории</h2></div>

           
            <div className="category-layout">
                <div className="category-list">
                    {categories.map(category => (
                        <div className="category-card" key={category.id}>
                            <h3>{category.name}</h3>
                            <Link to={`/category/${category.slug}`} className="category-link">
                                Посмотреть рецепты →
                            </Link>
                        </div>
                    ))}
                </div>
                    
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', paddingBottom: '40px' }}>
    {/* Левая колонка — текст */}
    <div style={{ flex: 1 }}>
        <div className="subtitle">
            <h2>Откройте для себя разнообразные блюда: от свежих салатов до изысканных десертов.</h2>
        </div>
        <div className="description">
        
            <h2>Найдите рецепты на любой вкус — будь то лёгкий перекус, горячие супы или изысканные десерты.</h2>
        </div>
        <div>
            <h2>Каждая категория содержит тщательно отобранные блюда, которые легко приготовить дома.</h2>
        </div>
        
        
        
        <div>
            <h2>Узнайте, какие блюда подойдут для лёгкого обеда, семейного ужина или для праздничного стола. </h2>
        </div>
         
        <div>
            <h2>Каждая категория — это коллекция рецептов, проверенных временем и вкусом.</h2>
        </div> 
       
        <div>
            <h2>Присоединяйтесь к кулинарному путешествию и создавайте шедевры у себя на кухне!</h2>
        </div>
        
    </div>

    {/* Правая колонка — картинка */}
    <div style={{ flex: 1 }}>
        <img
            className="category-image"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
            alt="Еда"
            style={{
               
                maxWidth: '750px',
                borderRadius: '12px',
                objectFit: 'cover',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
        />
    </div>
</div>
                
            </div>
        </div>
    );
}

export default Categories;
