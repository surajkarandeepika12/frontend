import { useState } from "react";
import './CategoryList.css';

function CategoryList({categories,onSelectCategory}){
    const[selectedCategory,setselectedCategory]=useState(null);

const handleCategoryClick=async(event)=>{
    const categoryId=event.target.value;
    setselectedCategory(categoryId);
    onSelectCategory(categoryId);
};
return(
    <div className="category-list-container">
        <label for="categoryselect">Categories:</label>
            <select id="categoryselect" value={selectedCategory} onChange={handleCategoryClick}>
                <option value="">select a category</option>
                {categories.map(category =>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
    </div>
);

}
export default CategoryList;