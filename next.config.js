const fetch = require('isomorphic-fetch');

const sendGetRequest = async (ctx) => {
  const res = await fetch(`https://tellurium.behuns.com/api/restaurants/`, {
    method: 'GET', 
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Accept-Language': "es",
    }
})

  const resJson = await res.json();
  return resJson
};


module.exports = {
  trailingSlash: true,
  exportPathMap: async function () {
    const posts = await sendGetRequest();
    const paths = {
      '/es/foodtype': { page: '/[lang]/foodtype' },
      '/en/foodtype': { page: '/[lang]/foodtype' },
      '/fr/foodtype': { page: '/[lang]/foodtype' },

      '/es/restaurantes': { page: '/[lang]/restaurantes' },
      '/en/restaurantes': { page: '/[lang]/restaurantes' },
      '/fr/restaurantes': { page: '/[lang]/restaurantes' },
      '/': { page: '/' },
      '/es': { page: '/[lang]' },
      '/en': { page: '/[lang]' },
      '/fr': { page: '/[lang]' },
    }
    //  User routes cargadas
    posts.forEach((product) => {
      paths[`/en/restaurante/${product.slug}`] = { page: '/[lang]/restaurante/[id]' };
    });
    posts.forEach((product) => {
      paths[`/fr/restaurante/${product.slug}`] = { page: '/[lang]/restaurante/[id]' };
    });
    posts.forEach((product) => {
      paths[`/es/restaurante/${product.slug}`] = { page: '/[lang]/restaurante/[id]' };
    });
    console.log(paths)
    return paths;
  },
};
