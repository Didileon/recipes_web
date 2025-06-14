function OpenAPI() {
    return (
        <div>
            <section className="api">
                <h1>OpenAPI</h1>
            </section>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '40px',
                    gap: '40px', // отступ между картинкой и текстом
                    flexWrap: 'wrap', // на маленьком экране — перенос
                }}
            >
                <img
                    className="category-image1"
                    src="https://avatars.mds.yandex.net/i?id=a05c2523a9e99ad1962423817f18a16d_l-4298822-images-thumbs&n=13"
                    alt="Еда1"
                    style={{
                        width: '850px',
                        borderRadius: '20px',
                        objectFit: 'cover',
                        flexShrink: 0,
                    }}
                />

                <div>
                    <section className="api1">
                        <p>
                            Все рецепты с нашего сайта вы можете увидеть{' '}
                            <a href="http://127.0.0.1:8000/api/recipes/">ТУТ</a>
                        </p>

                        <p>
                            Рецепты по категориям представлены{' '}
                            <a href="http://127.0.0.1:8000/api/categories/1/">ТУТ</a>
                        </p>
                    </section>

                    <section className="api2">
                        <p>
                            Не забывайте менять в конце цифры, чтобы переходить на необходимую категорию блюд.
                        </p>
                        <p>Категории начинаются с номера 1 и т.д.</p>
                    </section>

                    <section className="api3">
                        <p>
                            Все категории можно посмотреть{' '}
                            <a href="http://127.0.0.1:8000/recipes/categories/">ТУТ</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default OpenAPI;
