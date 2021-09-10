const fetch = require('isomorphic-fetch');

const sendGetRequest = async (ctx) => {
  const res = await fetch(`https://tellurium.behuns.com/api/restaurants/`, {
    method: 'GET', 
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Accept-Language': "es-ES",
    }
})

  const resJson = await res.json();
  return resJson
};


module.exports = {
  i18n: {
    locales: ["en-US", "fr-FR", "es-ES"],
    defaultLocale: "es-ES",
  },

  trailingSlash: true,
  exportPathMap: async function () {
    const posts = await sendGetRequest();
    const paths = {
      '/foodtype': { page: '/foodtype' },
      '/restaurantes': { page: '/restaurantes' },
      '/': { page: '/' },
    };
     //User routes cargadas
    posts.forEach((product) => {
      paths[`en-US/restaurante/${product.slug}`] = { page: 'en-US/restaurante/[id]' };
    });
    posts.forEach((product) => {
      paths[`fr-FR/restaurante/${product.slug}`] = { page: 'fr-FR/restaurante/[id]' };
    });
    posts.forEach((product) => {
      paths[`/restaurante/${product.slug}`] = { page: '/restaurante/[id]' };
    });
    console.log(paths)
    return paths;
  },
};
