import React, {useEffect, useState} from 'react';
import "./MyRecipes.css"
import api from '../../../services/api'
import clock from "../../../assets/clock.svg"

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes from the backend API
        const fetchRecipes = async () => {
            try {
                const response = await api.get('/recipes/personal');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="recipe-container">
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-square">
                    <img src={recipe.pictureURL} alt={recipe.name} className="recipe-image" />
                    <div className="recipe-info">
                        <div className="recipe-name">{recipe.name}</div>
                        <div className="recipe-clock">
                            <img src={clock} alt="Time" className="clock-icon"/>
                            <span>{recipe.prepTimeInMinutes}</span>
                        </div>
                        <div className="recipe-actions">
                            <button className="share-button">Share</button>
                            <button className="remove-button">Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyRecipes;