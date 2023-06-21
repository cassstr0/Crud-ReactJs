import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'


export default function UsuarioIndividual({ usuario }) {

    const navegar = useNavigate()

    //Para animación de scroll al bajar 
    useEffect(() => {
        AOS.init()
    }, [])



    //Función para borrar usuario
    function borrarUsuario(idusuario){
        axios.post('/api/usuario/borrar-usuario', { idusuario: idusuario }).then(res => {
            console.log('Datos de la respuesta:', res.data)
            //alert(res.data)
            Swal.fire('Correcto', 'El usuario se eliminó con éxito')
            navegar(0)
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className="container">
            <div className="row">

                <div className="col-sm-6 offset-3" data-aos="flip-right">
                    <ul className="list-group">
                        <li className="list-group-item">Id: {usuario.idusuario}</li>
                        <li className="list-group-item">Nombre: {usuario.nombre}</li>
                        <li className="list-group-item">Email: {usuario.email}</li>
                        <li className="list-group-item">Teléfono: {usuario.telefono}</li>
                    </ul>

                    <Link to={`/editar-usuario/${usuario.idusuario}`}><li className="btn btn-success">Editar</li></Link>
                    &nbsp;
                    <button className="btn btn-danger" onClick={()=>{borrarUsuario(usuario.idusuario)}}>Borrar</button>
                    <hr className="mt-4"></hr>
                </div>

            </div>
        </div>
    )
};
