import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Recipes from './components/Recipes';
import OpenAPI from './components/API';
import RecipeDetail from './components/RecipeDetail';
import CategoryRecipes from './components/CategoryRecipes';
import SearchRecipes from './components/SearchRecipes';

	
function App() {

     
	return (
	        <>

            <div className='App'>
                <div>
                   <Header />



                    <Routes>
                        <Route exact path='/' element={<Main />} />
                        <Route path="/Main" element={<Main />} />
                        <Route path='/components/Categories' element={<Categories />} />
                        <Route exact path='/components/Recipes' element={<Recipes />} />
                        <Route path="/category/:slug" element={<CategoryRecipes />} />
                        <Route path="/recipes/:id" element={<RecipeDetail />} />
                        <Route exact path='/components/SearchRecipes' element={<SearchRecipes />} />
                        <Route exact path='/components/OpenAPI' element={<OpenAPI />} />
                    </Routes>
                </div>


                        <Footer />
                </div>
            </>


	)
}

export default App;
