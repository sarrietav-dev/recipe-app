import { useEffect, useState } from "react";
import Recipe from "./Components/Recipes";
import "./App.css";

function App() {
    const APP_ID = "d3686f66";
    const APP_KEY = "561fab1d7ef32174e6725e98c7ff27c7";

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async () => {
        const response = await fetch(
            `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
    };

    return (
        <div className="App">
            <form className="search-form">
                <input type="text" className="search-bar" />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {recipes.map((recipe) => (
                <Recipe />
            ))}
        </div>
    );
}

export default App;
