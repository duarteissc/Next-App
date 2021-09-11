import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import i18next from 'i18next';

export default function Index() {
	const router = useRouter();

	useEffect(() => {
		const { pathname } = router;
    // console.log("na",i18next.localesr())
    console.log("naa",pathname)
		if (pathname == '/') {
			router.push('/' + i18next.language.substring(0, 2));
		}
	});
  return (
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
          )
}
