import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import "./AddRecipe.css";
import Spinner from "../../components/spinner/Spinner2";

const AddRecipe = ({ onClose }) => {
    const [name, setName] = useState('');
    const [preparation, setPreparation] = useState('');
    const [picture, setPicture] = useState(null);
    const [prepTimeInMinutes, setPrepTimeInMinutes] = useState(1);
    const [cookTimeInMinutes, setCookTimeInMinutes] = useState(1);
    const [ingredients, setIngredients] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchQuery.trim() !== '') {
                    const response = await api.get(`/ingredients?name=${searchQuery}&pageSize=4`);
                    const data = response.data.ingredients;
                    setSearchResults(data);
                }
            } catch (error) {
                console.error("Error searching ingredients:", error);
                setSearchResults([]);
            }
        };
        fetchData();
    }, [searchQuery]);

    const validateInputs = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Please enter a name for the recipe.";
        } else if (name.length < 2 || name.length > 50) {
            errors.name = "Recipe's name should be between 2 and 50 characters long.";
        }

        if (!preparation.trim()) {
            errors.preparation = "Please enter preparation steps for the recipe.";
        } else if (preparation.length < 10) {
            errors.preparation = "Please elaborate more on your preparation.";
        } else if (preparation > 1000) {
            errors.preparation = "Preparation shouldn't exceed 1000 characters long.";
        }

        if (prepTimeInMinutes < 1) {
            errors.prepTimeInMinutes = "Preparation time must be at least 1 minute.";
        }

        if (cookTimeInMinutes < 1) {
            errors.cookTimeInMinutes = "Cooking time must be at least 1 minute.";
        }

        if (Object.keys(ingredients).length === 0) {
            errors.ingredients = "Please select at least one ingredient for the recipe.";
        }

        if (!picture) {
            errors.picture = "Please upload a picture for the recipe.";
        } else {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileName = picture.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                errors.picture = "File must be an image!";
            }
        }

        setErrors(errors);

        return errors;
    };

    const handleAddIngredient = (ingredientObject) => {
        const { id, name, defaultAmount, amountType } = ingredientObject;
        setIngredients(prevState => ({ ...prevState, [id]: { name, amount: defaultAmount, amountType } }));
        setSearchResults(prevResults => prevResults.filter(ingredient => ingredient.id !== id));
        setSearchQuery('');
    };

    const handleRemoveIngredient = (id) => {
        const removedIngredient = ingredients[id];
        setIngredients(prevState => {
            const updatedIngredients = { ...prevState };
            delete updatedIngredients[id];
            return updatedIngredients;
        });
        setSearchResults(prevResults => [...prevResults, { id, name: removedIngredient.name, amountType: removedIngredient.amountType }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            setErrors(validationErrors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", picture);
            const response = await api.post("/cloud/files", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const pictureURL = response.data.fileUrl;
            const formattedIngredients = {};
            Object.entries(ingredients).forEach(([id, { amount }]) => {
                formattedIngredients[id] = amount;
            });
            await api.post("/recipes/personal", {
                name: name,
                preparation: preparation,
                pictureURL: pictureURL,
                prepTimeInMinutes: prepTimeInMinutes,
                cookTimeInMinutes: cookTimeInMinutes,
                ingredients: formattedIngredients,
            });
            onClose();
        } catch (e) {
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleSearch = async () => {
        try {
            const response = await api.get(`/ingredients?name=${searchQuery}&pageSize=4`);
            const data = response.data.ingredients;
            setSearchResults(data);
        } catch (error) {
            setSearchResults([]);
        }
    };

    return (
        <div className={"add-recipe-container"}>
            <div className={"add-recipe-header"}>
                <h3>Recipe creation</h3>
                <button className={"close-button"} onClick={onClose}>
                    X
                </button>
            </div>

            <div className={"upload-recipe-image-container"}>
                <label className={"picture-input-label"} htmlFor="picture">Upload Recipe Image:</label>
                <input id="picture" type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])}/>
                <div className={"error-container-v2"}>{errors.picture &&
                    <span className="error">{errors.picture}</span>} </div>
            </div>

            <div className={"add-recipe-form-container"}>
                {isLoading && (
                    <div className="spinner-overlay">
                        <Spinner />
                    </div>
                )}
                <label htmlFor="name">Recipe Name:</label>
                <input id="name" type="text" placeholder="Recipe Name" value={name} onChange={(e) => setName(e.target.value)} />
                <div className={"error-container-v2"}>{errors.name && <span className="error">{errors.name}</span>} </div>

                <label htmlFor="preparation">Preparation Steps:</label>
                <textarea id="preparation" placeholder="Preparation Steps" value={preparation} onChange={(e) => setPreparation(e.target.value)} />
                <div className={"error-container-v2"}>{errors.preparation &&
                    <span className="error">{errors.preparation}</span>} </div>

                <label htmlFor="prepTimeInMinutes">Prep Time (minutes):</label>
                <input id="prepTimeInMinutes" type="number" placeholder="Prep Time (minutes)" value={prepTimeInMinutes} onChange={(e) => setPrepTimeInMinutes(parseInt(e.target.value, 10))} />
                <div className={"error-container-v2"}> {errors.prepTimeInMinutes && <span className="error">{errors.prepTimeInMinutes}</span>} </div>

                <label htmlFor="cookTimeInMinutes">Cook Time (minutes):</label>
                <input id="cookTimeInMinutes" type="number" placeholder="Cook Time (minutes)" value={cookTimeInMinutes} onChange={(e) => setCookTimeInMinutes(parseInt(e.target.value, 10))} />
                <div className={"error-container-v2"}>{errors.cookTimeInMinutes &&
                    <span className="error">{errors.cookTimeInMinutes}</span>} </div>

                <label htmlFor="searchQuery">Search Ingredients:</label>
                <input id="searchQuery" type="text" placeholder="Search Ingredients" value={searchQuery} onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch();
                }} />
                <div className={"error-container-v2"}>{errors.ingredients &&
                    <span className="error">{errors.ingredients}</span>} </div>

                <div className={"ingredients-container"}>
                    {searchResults.map(ingredient => (
                        <div key={ingredient.id}>
                            {ingredient.name}
                            <button className={"add-ingredient-btn"} onClick={() => handleAddIngredient(ingredient)}>+
                            </button>
                        </div>
                    ))}
                </div>
                <h4>Selected Ingredients:</h4>
                <ul>
                    {Object.entries(ingredients).map(([id, { name, amount, amountType }]) => (
                        <li key={id}>
                            {name}
                            <input type="number" value={amount} onChange={(e) => setIngredients(prevState => ({
                                ...prevState,
                                [id]: { ...prevState[id], amount: e.target.value }
                            }))} />
                            <span>{amountType}</span>
                            <button onClick={() => handleRemoveIngredient(id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className={"add-recipe-form-container-submit"}>
                    <button onClick={handleSubmit}>Create Recipe</button>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
