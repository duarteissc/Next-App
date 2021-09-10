import Header from "../components/header";
import React, { useState } from 'react';
import ProvedorTema from '../contexto/contexto'
function MyApp({ Component, pageProps }) {
  const [restaurantes, setrestaurantes] = useState([]);
  const [foodtype, setFoodtype] = useState([]);
  return (
    <ProvedorTema>
      <Header />
      <Component {...pageProps} setrestaurantes={setrestaurantes} restaurantes={restaurantes}  setFoodtype={setFoodtype} foodtype={foodtype}/>
    </ProvedorTema>
  );
}

export default MyApp;
