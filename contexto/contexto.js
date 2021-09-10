import React, { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const ContextoProduct = createContext();

function ProvedorTema({ children }) {
    const { locale, asPath } = useRouter();

    const [foodtypes, setFoodtypes] = useState([]);
    const [restaurantes, setrestaurantes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( async() => {
        const res = await fetch('https://tellurium.behuns.com/api/restaurants/', {
            method: 'GET', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Accept-Language': locale,
            }
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => response.json())
        .catch(error => {
            console.log(error)
            alert(error)
        });

        const resf = await fetch('https://tellurium.behuns.com/api/food_types/', {
            method: 'GET', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Accept-Language': locale,
            }
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => response.json())
        .catch(error => {
            console.log(error)
            alert(error)
        });
        
        setFoodtypes(resf)
        setrestaurantes(res)
        setIsLoading(false);
    }, []);

    
    return (
        <ContextoProduct.Provider value={{ restaurantes, setrestaurantes, isLoading, foodtypes}}>
            {children}
        </ContextoProduct.Provider>);
}

export default ProvedorTema;

export function useAPI() {
    const context = useContext(ContextoProduct);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}