import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});


  
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(() => {
    const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('collections');
            setCategoriesMap(categoryMap);
     };
    
     getCategoriesMap();
     }, []);
    console.log(categoriesMap);
    const value = { categoriesMap };
    return (
     <CategoriesContext.Provider value={value}>
         {children}
     </CategoriesContext.Provider>
    );
};