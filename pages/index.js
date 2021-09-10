import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import NewsCard from "../components/newscard";
import Restaurantes from '../components/Restaurantes';
import Script from 'next/script'
const newsContent = {
  "en-US": {
    title: "News",
    search: "Search by foodtype",
    content: [
      {
        title:
          "Otter.ai’s new assistant can automatically transcribe your Zoom meetings",
        synopsis:
          "A.I.-powered voice transcription service Otter.ai wants to make it even easier for its business users to record their meetings. The company is today introducing a new feature, Otter Assistant, whic...",
        imageUrl: "",
      },
    ],
  },
  "fr-FR": {
    title: "Nouvelles",
    search: "Search by foodtype",
    content: [
      {
        title:
          "Le nouvel assistant d'Otter.ai peut transcrire automatiquement vos réunions Zoom",
        synopsis:
          "Le service de transcription vocale alimenté par A.I. Otter.ai veut rendre encore plus facile pour ses utilisateurs professionnels l'enregistrement de leurs réunions. La société présente aujourd'hui une nouvelle fonctionnalité, Otter Assistant, qui ...",
        imageUrl: "",
      },

    ],
  },
  "es-ES": {
    title: "Noticias",
    search: "Buscar por tipo de comida",
    content: [
      {
        title:
          "El nuevo asistente de Otter.ai puede transcribir automáticamente sus reuniones de Zoom",
        synopsis:
          "El servicio de transcripción de voz con tecnología de inteligencia artificial Otter.ai quiere facilitar aún más a sus usuarios comerciales la grabación de sus reuniones. La compañía presenta hoy una nueva función, Otter Assistant, que ...",
        imageUrl: "",
      }
    ],
  },
};

function Index() {
  const { locale, asPath } = useRouter();
  const { title, content, search } = newsContent[locale];
  return (
    <>
         <Script src="https://third-party-script.js"></Script>
      <Head>
        <title>Teeb</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />s
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.breadcrumb}>
            <div
              style={{
                padding: "4px",
                marginRight: "4px",
              }}
            >
              <span>Current Language: </span>
              <span
                style={{
                  borderRadius: "3px",
                  backgroundColor: "blue",
                  color: "white",
                  padding: "2px",
                }}
              >
                {locale}
              </span>
            </div>
            <Link
              activeClassName={locale === "es-ES"}
              href={asPath}
              locale="es-ES"
            >
              es-ES
            </Link>

            <Link
              activeClassName={locale === "en-US"}
              href={asPath}
              locale="en-US"
            >
              en-US
            </Link>
            <Link
              activeClassName={locale === "fr-FR"}
              href={asPath}
              locale="fr-FR"
            >
              fr-FR
            </Link>
          </div>

          <div className={styles.newscontainer}>
            <div className={styles.yournewscasts}>
              <h3>{title}</h3>
            </div>
            <div>
              {content.map((newsItem, i) => (
                <NewsCard key={i} news={newsItem} />
              ))}
            </div>
            <div className="row">
              <Restaurantes search={search} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


export default Index