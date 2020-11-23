import { useEffect, useState } from "react";
import Recipe from "./Components/Recipes";
import "./App.css";

function App() {
    const APP_ID = "d3686f66";
    const APP_KEY = "561fab1d7ef32174e6725e98c7ff27c7";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    };

    return (
        <div className="App">
            <form className="search-form" onSubmit={getSearch}>
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
            <div className="recipes">
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        image={recipe.recipe.image}
                        calories={recipe.recipe.calories}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
