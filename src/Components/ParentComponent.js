import axios from "axios";
import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
// import CartItemsUser from "./CartItemsUser";
import './products.css';
function ParentComponent(){
    const[categories,setCategories]=useState([]);
    const[products,setproducts]=useState([]);
    const[selectedCategory,setselectedCategory]=useState(null);
    useEffect(()=>{
        async function fetchCategories(){
            const response = await axios.get(`http://localhost:8093/categories`);
            const data = response.data;
            setCategories(data);
        }
    fetchCategories();
    }, []);
    const fetchProducts = async(categoryid)=>{
        let url=`http://localhost:8094/products`;
        if(categoryid){
            url=`http://localhost:8094/products/category/${categoryid}`;
        }
        const response = await axios.get(url);
        const data = response.data;
        setproducts(data);
    };
    useEffect(()=>{
        fetchProducts(selectedCategory);
    },[selectedCategory]);
    return(
        <div>
            <CategoryList categories={categories} onSelectCategory={setselectedCategory}/>
            <ProductList products={products}/>
            {/* <CartItemsUser productdetails={products}/> */} 
        </div>
    )
}
export default ParentComponent;
