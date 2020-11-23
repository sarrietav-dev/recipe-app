import { useEffect, useState } from "react";
import Recipe from "./Components/Recipes";
import "./App.css";

function App() {
    const APP_ID = "d3686f66";
    const APP_KEY = "561fab1d7ef32174e6725e98c7ff27c7";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getRecipes();
        console.log("Fetching");
    }, [search]);

    const getRecipes = async () => {
        const response = await fetch(
            `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    return (
        <div className="App">
            <form className="search-form">
                <input
                    type="text"
                    className="search-bar"
                    value={search}
                    onChange={updateSearch}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {recipes.map((recipe) => (
                <Recipe
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    image={recipe.recipe.image}
                    calories={recipe.recipe.calories}
                />
            ))}
        </div>
    );
}

export default App;
