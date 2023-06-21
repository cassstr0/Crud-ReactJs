import React, { useEffect, useState } from "react";
import UsuarioIndividual from "./UsuarioIndividual";
import axios from "axios";

export default function ListaUsuarios() {

    const[datausuarios, setdatausuario]=useState([])

    useEffect(() => {
        axios.get('api/usuario/obtener-usuarios').then(res => {
            console.log(res.data)
            setdatausuario(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    //Mapear listausuario en objeto usuario
    const listausuarios = datausuarios.map(usuario => {
        return(
            <div>
                <UsuarioIndividual usuario={usuario}/>
            </div>
        )
    })

    return(
        <div>
            <h2>Lista de usuarios</h2>
            {listausuarios}
        </div>
    )
};
