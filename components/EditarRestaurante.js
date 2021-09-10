import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRef } from 'react'
import { useEffect } from "react";
import { useAPI } from '../contexto/contexto'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch"
        }
    },
    input: {

        display: 'none',
    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const EditarRestaurante = () => {
    //Data
    const { restaurantes, setrestaurantes, isLoading, foodtypes } = useAPI();
    //Class
    const classes = useStyles();
    //Routing
    const { locale } = useRouter();
    const router = useRouter();
    const { id } = router.query;
    const resultado = restaurantes.find(data => data.slug === id);

    const inputimg = useRef(null)
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };
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
    //Foodtypes
    useEffect(() => {
        var ArrayFoodtypes = [];
        for (var i in resultado.food_type) {
            ArrayFoodtypes.push(foodtypes.find(x => x.slug == resultado.food_type[i]).name)
        }
        setPersonName(ArrayFoodtypes)
    }, []);

    const CargarImg = () => {
        var file = inputimg.current.files[0]
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = document.getElementById('img');
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }

    const EditarRestaurant = async () => {
        let name = document.getElementById('id_restaurant_name').value
        let description = document.getElementById('id_restaurant_description').value
        const newArray = [];
        for (var i in personName) {
            newArray.push(foodtypes.find(x => x.name == personName[i]).slug)
        }
        var formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        for (var i = 0; i < newArray.length; i++) {
            formData.append('food_type', newArray[i]);
        }
        const profile = document.getElementById('input_img2');
        if (profile.files[0]) {
            formData.append("logo", profile.files[0]);
        }

        fetch(`https://tellurium.behuns.com/api/restaurants/${resultado.slug}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Accept-Language': locale,

            },
            body: formData
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => {
            handleClick()
        }).catch(error => {
            console.log(error)

            handleClickError()
        });

    }
    const EliminarRestaurante = async () => {
        fetch(`https://tellurium.behuns.com/api/restaurants/${resultado.slug}/`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': locale,
            }
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => {
            handleClick()
        }).catch(error => {
            handleClickError()
        });
    }
    const AgregarRestaurante = async () => {
        let name = document.getElementById('id_restaurant_name').value
        let description = document.getElementById('id_restaurant_description').value
        const newArray = [];
        for (var i in personName) {
            newArray.push(foodtypes.find(x => x.name == personName[i]).slug)
        }
        var formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        for (var i = 0; i < newArray.length; i++) {
            formData.append('food_type', newArray[i]);
        }
        const profile = document.getElementById('input_img2');
        if (profile.files[0]) {
            formData.append("logo", profile.files[0]);
        }

        fetch(`https://tellurium.behuns.com/api/restaurants/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Language': locale,

            },
            body: formData
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => {
            handleClick()
        }).catch(error => {
            console.log(error)
            handleClickError()
        });
    }

    return (
        <>
            {isLoading ? <>{ <p>Gargando..</p> }  </>
                :
                <div className={classes.root} noValidate autoComplete="off">
                    <div style={{
                        position: "relative",
                        inset: "0px",
                        display: "flex",
                        width: "calc(100%)",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(3em + 4vw)",
                        margin: "calc(.2em + .2vw)",
                    }}>
                        <img id="img" src={resultado.logo} style={{ borderRadius: "3px", maxWidth: "100%", objectFit: "contain", maxHeight: "100%", display: "block" }} />

                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div>
                            <input accept="image/*" ref={inputimg} className={classes.input} onChange={CargarImg} id="input_img2" type="file" />
                            <label htmlFor="input_img2">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </div>
                        <Card>
                            <Box style={{ textAlign: "right", paddingTop: "1em", paddingRight: "1em" }} component="fieldset" borderColor="transparent">
                                <Typography component="legend">Rating</Typography>
                                <Rating name="read-only" value={resultado.rating} readOnly />
                            </Box>
                            <div>
                                <TextField style={{ width: "100%" }}
                                    id="standard-read-only-input"
                                    label="Slug"
                                    defaultValue={resultado.slug}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                /></div>
                            <div>
                                <TextField style={{ width: "100%" }}
                                    id="standard-read-only-input"
                                    label="Rating"
                                    defaultValue={resultado.rating}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField style={{ width: "100%" }}
                                    id="id_restaurant_name"
                                    label="Nombre restaurante"
                                    defaultValue={resultado.name}
                                />
                            </div>
                            <div>
                                <TextField style={{ width: "100%" }}
                                    id="id_restaurant_description"
                                    label="Descripción restaurante"
                                    defaultValue={resultado.description}
                                />
                            </div>
                            <div>
                                <FormControl className={classes.formControl} style={{ width: "100%" }}>
                                    <InputLabel id="demo-mutiple-checkbox-label">Foodtypes</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {foodtypes.map((name) => (
                                            <MenuItem key={name.name} value={name.name}>
                                                <Checkbox checked={personName.indexOf(name.name) > -1} />
                                                <ListItemText primary={name.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ margin: "2em" }}>
                                <Button variant="contained" onClick={EditarRestaurant} style={{ width: "100%", marginBottom: "1em" }} color="primary">
                                    Editar
                                </Button>
                                <Button variant="contained" onClick={EliminarRestaurante} style={{ width: "100%", marginBottom: "1em" }} color="secondary">
                                    Eliminar
                                </Button>
                                <Button variant="contained" onClick={AgregarRestaurante} style={{ width: "100%", marginBottom: "1em" }} color="default">
                                    Agregar nuevo
                                </Button>
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
                            </div>
                        </Card>
                    </div>
                </div>
            }

        </>
    )
}
export default EditarRestaurante;





