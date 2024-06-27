import React, {useEffect, useState} from 'react';
import "./MyRecipes.css"
import api from '../../../services/api'
import clock from "../../../assets/clock.svg"
import AddRecipeButton from "../../../components/add_recipe/AddRecipeButton";
import AddRecipe from "../../../components/add_recipe/AddRecipe";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyRecipes = () => {
    const [showAddRecipeWindow, setShowAddRecipeWindow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('/recipes/personal');
                filterRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [showAddRecipeWindow, searchTerm])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this recipe?");
        if (confirmDelete) {
            try {
                await api.delete(`/recipes/personal/${id}`);
                setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== id));
                toast.success('Recipe deleted!');
            } catch (error) {
                toast.error("Error removing recipe! " + error.response.data.message);
            }
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };


    const filterRecipes = (data) => {
        const filtered = data.filter((recipe) =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    const handleCloseAddRecipeWindow = () => {
        setShowAddRecipeWindow(false);
    }

    const handleOpenAddRecipeWindow = () => {
        setShowAddRecipeWindow(true);
        console.log("triggered showAddRecipeWindow", showAddRecipeWindow);
    }


    return (
        <div>

            <div className="my-recipes-title">
                <h2>My Recipes</h2>
                <div className="title-line"></div>
            </div>
            <div className={"recipe-control-menu"}>
                <input
                    type="text"
                    placeholder="Search through your recipes"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <ToastContainer />
            {showAddRecipeWindow && (
                <AddRecipe onClose={handleCloseAddRecipeWindow} />
            )}
            <div className="recipe-container">
            <div onClick={handleOpenAddRecipeWindow}><AddRecipeButton /></div>
            {filteredRecipes.map(recipe => (
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