import React, {useEffect, useState} from 'react';
import "./MyRecipes.css"
import api from '../../../services/api'
import clock from "../../../assets/clock.svg"
import AddRecipe from "../../../components/add_recipe/AddRecipe";

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('/recipes/personal');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this recipe?");
        if (confirmDelete) {
            try {
                await api.delete(`/recipes/personal/${id}`);
                setRecipes(recipes.filter(recipe => recipe.id !== id));
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    }

    return (
        <div>
            <div className="my-recipes-title">
                <h2>My Recipes</h2>
                <div className="title-line"></div>
            </div>
        <div className="recipe-container">
            <AddRecipe />
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-square">
                    <img src={recipe.pictureURL} alt={recipe.name} className="recipe-image" />
                    <div className="recipe-info">
                        <div className="recipe-name">{recipe.name}</div>
                        <div className="recipe-clock">
                            <img src={clock} alt="Time" className="clock-icon"/>
                            <span>{recipe.totalTime}</span>
                        </div>
                        <div className="recipe-actions">
                            <button className="share-button">Share</button>
                            <button className="remove-button" onClick={() => handleDelete(recipe.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default MyRecipes;