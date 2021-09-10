import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAPI } from '../contexto/contexto'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Comment from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const IdRestaurante = () => {

    const useStyles = makeStyles((theme) => ({

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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [value, setValue] = React.useState(0);
    const { restaurantes, isLoading, foodtypes } = useAPI();

    const { locale } = useRouter();
    const router = useRouter();
    const { id } = router.query;
    const resultado = restaurantes.find(data => data.slug === id);
    //SnackBAR
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    const handleClickError = () => {
        setError(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
        setOpen(false);
    };
    const AddComment = () => {
        let email = document.getElementById('id_correo').value
        let comment = document.getElementById('id_comment').value
        fetch("https://tellurium.behuns.com/api/reviews/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': locale,
            },
            body: JSON.stringify({ "restaurant": resultado.slug, "email": email, "comments": comment, "rating": value }) // body data type must match "Content-Type" header
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => {
            handleClick()
        }).catch(error => {
            handleClickError()
        }); 
    }
    return (
        <>
            {
                <div>{isLoading ? <>{<p>Cargando..</p>}</>
                    :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-0 col-md-2 col-lg-2"></div>
                            <div className="col-xs-12 col-md-4 col-lg-4" style={{ marginTop: "4em" }}>
                                <div style={{ width: "100%" }}>
                                    <Card>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    R
                                                </Avatar>
                                            }
                                            action={
                                                <Box style={{ textAlign: "right" }} component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend">Rating</Typography>
                                                    <Rating name="read-only" value={resultado.rating} readOnly />
                                                </Box>

                                            }
                                            title={resultado.name}
                                            subheader="September 14, 2016"
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            image={resultado.logo ? resultado.logo : "https://www.silverringsplint.com/wp-content/uploads/2018/05/Product-Image-Coming-Soon.png"}
                                            title="Paella dish"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {resultado.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>

                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded,
                                                })}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <Comment />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph>Comments:</Typography>

                                                <Typography paragraph >
                                                    {
                                                        resultado.reviews.map((element, index) => (
                                                            <CardContent key={element.slug}>

                                                                <div><span>{element.created}</span></div>


                                                                <div>{element.email}</div>
                                                                <div><span>{element.comments}</span></div>
                                                                <div style={{ textAlign: "right" }}><span>rating:{element.rating}</span></div>

                                                            </CardContent >
                                                        ))
                                                    }
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </div>

                            </div>

                            <div className="col-xs-12 col-md-4 col-lg-4" style={{ marginTop: "4em" }}>
                                <div style={{ width: "100%" }}>
                                    <TextField style={{ width: "100%" }}
                                        className={classes.margin}
                                        id="id_correo"
                                        label="Email"

                                        type="email"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div>
                                        <TextField style={{ width: "100%" }}
                                            id="id_comment"
                                            label="Comment"
                                        />
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend">Rating</Typography>
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </Box>
                                    </div>
                                    <div style={{ margin: "2em" }}>
                                        <Button variant="contained" onClick={AddComment} style={{ width: "100%", marginBottom: "1em" }} color="primary">
                                            Agregar
                                        </Button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-xs-0 col-md-2 col-lg-2"></div>
                        </div>
                    </div>
                }</div>
            }
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Cambios guardados
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Error, verifique los campos.
                </Alert>
            </Snackbar>
        </>
    )
}
export default IdRestaurante;

