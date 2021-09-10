import Head from 'next/head'
import { useEffect } from "react";
import { useRouter } from "next/router";
import ItemTypeFood from '../components/ItemTypeFood.js';
import React, { useState } from 'react';
import Script from 'next/script'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";

import { useAPI } from '../contexto/contexto'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const FoodType = () => {

    const { isLoading, foodtypes } = useAPI();
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const { locale } = useRouter();
    const [estado, setestado] = useState(["nada"]);
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
    // Methods
    const foodtypesclass = foodtypes.map(element => {
        return (
            <ItemTypeFood
                key={element.slug}
                element={element}
                setestado={setestado}
            />
        );
    });
    const AddFoodtype = () => {
        let name = document.getElementById('id_foodtype_name').value
         fetch("https://tellurium.behuns.com/api/food_types/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': locale,
            },
            body: JSON.stringify({ "name": name }) // body data type must match "Content-Type" header
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => {
            handleClick()
        }).catch(error => {
            handleClickError()
        }); // parses JSON response into native JavaScript objects
    }
    const EditFoodtype = () => {
        var name = document.getElementById('id_foodtype_name').value
        var id_slug = document.getElementById('id_foodtype_slug').textContent
        fetch(`https://tellurium.behuns.com/api/food_types/${id_slug}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': locale,
            },
            body: JSON.stringify({ "name": name }) // body data type must match "Content-Type" header
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => {
            handleClick()
        }).catch(error => {
            handleClickError()
        });
    }
    const DeleteFoodtype =  () => {
        let id_slug = document.getElementById('id_foodtype_slug').textContent
       fetch(`https://tellurium.behuns.com/api/food_types/${id_slug}/`, {
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
    return (
        <>
             <Script src="https://third-party-script.js"></Script>
            <Head>
                <title>Foodtype</title>
                <meta name="HandheldFriendly" content="true" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
                <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet" />
            </Head>
            {isLoading ? <>Cargando..</>
                :
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6">
                                <div style={{ margin: "4em" }}>
                                    <TableContainer component={Paper} >
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Foodtype</TableCell>
                                                    <TableCell align="center">Slug</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {foodtypesclass}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{ margin: "4em", textAlign: "center" }}>
                                    <div><span id="id_foodtype_slug" value={estado.slug}>{estado.slug}</span></div>

                                    <TextField
                                        id="id_foodtype_name"
                                        label={estado.name}
                                        helperText="Foodtype name"
                                        type="text"
                                    />
                                    <BottomNavigation
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        showLabels
                                        className={classes.root}
                                    >
                                        <BottomNavigationAction label="Agregar" onClick={AddFoodtype} icon={<AddCircleOutline />} />
                                        <BottomNavigationAction label="Editar" onClick={EditFoodtype} icon={<Edit />} />
                                        <BottomNavigationAction label="Eliminar" onClick={DeleteFoodtype} icon={<Delete />} />
                                    </BottomNavigation>

                                </div>
                            </div>
                        </div>
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
                </>
            }
        </>
    )
}

export default FoodType