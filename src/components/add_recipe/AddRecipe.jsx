import React, {useState, useEffect} from 'react';
import api from "../../services/api";
import "./AddRecipe.css"
import { useForm } from 'react-hook-form';
import Spinner from "../../components/spinner/Spinner2";


const AddRecipe = ({onClose}) => {
    const [name, setName] = useState('');
    const [preparation, setPreparation] = useState('');
    const [picture, setPicture] = useState(null);
    const [prepTimeInMinutes, setPrepTimeInMinutes] = useState(1);
    const [cookTimeInMinutes, setCookTimeInMinutes] = useState(1);
    const [ingredients, setIngredients] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);





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


    const handleAddIngredient = (ingredientObject) => {
        const { id, name, defaultAmount, amountType } = ingredientObject;
        setIngredients(prevState => ({ ...prevState, [id]: { name, amount: defaultAmount, amountType } }));
        setSearchResults(prevResults => prevResults.filter(ingredient => ingredient.id !== id));
        setSearchQuery('');
    }

    const handleRemoveIngredient = (id) => {
        const removedIngredient = ingredients[id];
        setIngredients(prevState => {
            const updatedIngredients = { ...prevState };
            delete updatedIngredients[id];
            return updatedIngredients;
        });
        setSearchResults(prevResults => [...prevResults, { id, name: removedIngredient.name, amountType: removedIngredient.amountType }]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
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
            })
            onClose();
        } catch (e) {
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const handleSearch = async () => {
        try {
            const response = await api.get(`/ingredients?name=${searchQuery}&pageSize=4`);
            const data = response.data.ingredients;
            setSearchResults(data);
        } catch (error) {
           setSearchResults([])
        }
    }

    return (
        <div className={"add-recipe-container"}>
            <div className={"add-recipe-header"}>
                <h3>Recipe creation</h3>
                <button className={"close-button"} onClick={onClose}>
                    X
                </button>
            </div>
            <div className={"upload-recipe-image-container"}>
                <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
            </div>
            <div className={"add-recipe-form-container"}>
                {isLoading && (
                    <div className="spinner-overlay">
                        <Spinner />
                    </div>
                )}
                <input type="text" placeholder="Recipe Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <textarea placeholder="Preparation Steps" value={preparation}
                          onChange={(e) => setPreparation(e.target.value)}/>
                <input type="number" placeholder="Prep Time (minutes)" value={prepTimeInMinutes}
                       onChange={(e) => setPrepTimeInMinutes(parseInt(e.target.value, 10))}/>
                <input type="number" placeholder="Cook Time (minutes)" value={cookTimeInMinutes}
                       onChange={(e) => setCookTimeInMinutes(parseInt(e.target.value, 10))}/>
                <input type="text" placeholder="Search Ingredients" value={searchQuery} onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch();
                }}/>
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
                    {Object.entries(ingredients).map(([id, {name, amount, amountType}]) => (
                        <li key={id}>
                            {name}
                            <input type="number" value={amount} onChange={(e) => setIngredients(prevState => ({
                                ...prevState,
                                [id]: {...prevState[id], amount: e.target.value}
                            }))}/>
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
}


export default AddRecipe;