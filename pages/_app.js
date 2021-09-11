import Header from "../components/header";
import React, { useState } from 'react';
import ProvedorTema from '../contexto/contexto'
import '../i18n/init';
import i18next from 'i18next';
function MyApp({ Component, pageProps }) {
  const [restaurantes, setrestaurantes] = useState([]);
  const [foodtype, setFoodtype] = useState([]);
  i18next.changeLanguage(pageProps.language);
  return (
    <ProvedorTema>
      <Header languaje={i18next.t('siteMeta.languaje')}/>
      <Component {...pageProps} setrestaurantes={setrestaurantes} restaurantes={restaurantes}  setFoodtype={setFoodtype} foodtype={foodtype}/>
    </ProvedorTema>
  );
}

export default MyApp;
