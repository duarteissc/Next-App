import Head from 'next/head'
import IdRestaurante from '../../../components/IdRestaurante'
const Restaurante = () => {
    return (
        <>
            <Head>
                <title>Restaurante</title>

                <meta name="HandheldFriendly" content="true" />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>

                <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet" />
            </Head>
            <IdRestaurante />
        </>
    )
}

export default Restaurante