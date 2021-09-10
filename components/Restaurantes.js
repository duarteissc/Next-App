import { useAPI } from '../contexto/contexto'

import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Router from 'next/router'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';


export default function Productos({ search }) {


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
  const [age, setAge] = useState('Todos');
  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { restaurantes, isLoading, foodtypes } = useAPI();
  return (
    <>
      {!isLoading ? <>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">{search}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {
                foodtypes.map((element, index) => {
                  return <MenuItem key={index} value={element.slug}>{element.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>
       {
          restaurantes.map((element, index) => {
            if (age == "Todos" ) {
              return <div className="col-xs-12 col-md-6" key={index} style={{ marginTop: "4em" }}>
              <div style={{ width: "100%" }}>
                <Card onClick={e => Router.push('/restaurante/[id]', `/restaurante/${element.slug}`)}>
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
            }
            else if (element.food_type.includes(age)) {
              return <div className="col-xs-12 col-md-6" key={index}  style={{ marginTop: "4em" }}>
                  <div style={{ width: "100%" }} >
                    <Card onClick={e => Router.push('/restaurante/[id]', `/restaurante/${element.slug}`)}>
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
                        title={element.logo}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {element.description}
                        </Typography>
                      </CardContent>                 
                    </Card>
                  </div>
                </div>
            }
          })
        }
      </>
        : <p>Cargando..</p>}
    </>
  )
}