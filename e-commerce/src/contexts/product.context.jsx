import { createContext, useState,useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase.utils.js";

export const ProductsContext = createContext({
 products: [],
})

export const ProductProvider = ({children}) =>{
    const[products, setProducts] = useState([]);
   // useEffect(()=> {
   //     addCollectionAndDocuments('collections', SHOP_DATA)
  //  },[]);

    const value = {products};
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}