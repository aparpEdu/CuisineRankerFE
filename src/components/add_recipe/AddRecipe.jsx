import React from 'react';
import plus from "../../assets/plus.svg"


const AddRecipe = () => {
    return (
        <div className="recipe-square add-recipe-card" style={{ color: '#ffffff' }}>
            <div className="add-recipe-content" >
                <img src={plus} alt={"add recipe"} className="add-recipe-icon"/>
            </div>
        </div>
    );
}

export default AddRecipe;