import Head from 'next/head'
import React from 'react';
import Router from 'next/router'
import { useAPI } from '../../contexto/contexto'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';
import Script from 'next/script'
import i18next from 'i18next';
import Layout from '../../components/Layout';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';
const restaurants = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%!important",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: "100%",
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },

    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const classes = useStyles();
  const { restaurantes, isLoading } = useAPI();
  return (
    <>

      <Head>

        <title>Restaurantes2</title>
        <meta name="HandheldFriendly" content="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet" />
      </Head>
      <Layout >
        <div className="row">
          {!isLoading ? <>
            <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet" />
            <style dangerouslySetInnerHTML={{ __html: ".__area {\n  font-family: 'Cairo', sans-serif;\n  color: #7c7671;\n  margin-top: 100px\n}\n\n.__card {\n  max-width: 350px;\n  margin: auto;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  color: unset;\n}\n.__card:hover {\n  color: unset;\n  text-decoration: none;\n}\n.__img {\n  border-radius: 10px;\n}\n\n.__favorit {\n  background-color: #fff;\n  border-radius: 8px;\n  color: #fc9d52;\n  position: absolute;\n  right: 15px;\n  top: 8px;\n  padding: 3px 4px; \n  font-size: 22px;\n  line-height: 100%;\n  box-shadow: 0 0 5px rgba(0,0,0,0.3);\n  z-index: 1;\n  border: 0;\n}\n.__favorit:hover {\n  background-color: #fc9d52;\n  color: #fff;\n  text-decoration: none;\n}\n.__card_detail {\n  box-shadow: 0 4px 15px rgba(175,77,0,0.13);\n  padding: 13px;\n  border-radius: 8px;\n  margin: -30px 10px 0;\n  position: relative;\n  z-index: 2;\n  background-color: #fff; \n}\n.__card_detail h4 {\n  color: #474340;\n  line-height: 100%;\n  font-weight: bold;\n}\n.__card_detail p {\n  font-size: 13px;\n  font-weight: bold;\n  margin-bottom: 0.4rem;\n}\n.__type span {\n  background-color: #feefe3;\n  padding: 5px 10px 7px;\n  border-radius: 5px;\n  display: inline-block;\n  margin-right: 10px;\n  font-size: 12px;\n  color: #fc9d52;\n  font-weight: bold;\n  line-height: 100%;\n}\n.__detail {\n  margin-top: 5px;\n}\n.__detail i {\n  font-size: 21px;\n  display: inline-block;\n  vertical-align: middle;\n}\n.__detail i:nth-child(3) {\n  margin-left: 15px;\n}\n.__detail span {\n  font-size: 16px;\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 2px;\n}" }} />
            {
              restaurantes.map((element, index) => (
                <div className="col-xs-12 col-md-6" key={index} style={{ marginBottom: "2em" }}>
                  <div style={{ width: "100%" }}>
                    <Card onClick={e => Router.push('/[lang]/editrestaurant/[id]', `/${i18next.t('siteMeta.languaje')}/editrestaurant/${element.slug}`)}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                          </Avatar>
                        }
                        action={
                          <Box style={{ textAlign: "right" }} component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Rating</Typography>
                            <Rating name="read-only" value={element.rating} readOnly />
                          </Box>

                        }
                        title={element.name}
                        subheader="September 14, 2016"
                      />
                      <CardMedia
                        className={classes.media}
                        image={element.logo ? element.logo : "https://www.silverringsplint.com/wp-content/uploads/2018/05/Product-Image-Coming-Soon.png"}
                        title="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {element.description}
                        </Typography>
                      </CardContent>


                    </Card>
                  </div>

                </div>


              ))
            }
          </>
            : <p>Cargando..</p>}
        </div>
      </Layout>
    </>
  )
}

export default restaurants



//Import state languajes
export async function getStaticPaths() {
	const paths = getAllLanguageSlugs();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const language = getLanguage(params.lang);
	return {
		props: {
			language,
		},
	};
}