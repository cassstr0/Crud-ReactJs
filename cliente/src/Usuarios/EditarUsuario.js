import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'


export default function EditarUsuarios() {

    const params = useParams()

    //Hooks
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')

    //Para volver al inicio
    const navegar = useNavigate();

    useEffect(() => {
        axios.post('/api/usuario/obtener-data-usuario', { idusuario: params.idusuario }).then(res => {
            console.log('Datos de la respuesta:', res.data[0])
            const datausuario = res.data[0]
            setNombre(datausuario.nombre)
            setEmail(datausuario.email)
            setTelefono(datausuario.telefono)
        })
    }, [])

    //Funcion editar
    function editarUsuario() {
        //Nuevo objeto para actualizar el usuario
        const actualizarusuario = {

            nombre: nombre,
            email: email,
            telefono: telefono,
            idusuario: params.idusuario,

        }

        //Hacer la petición usando axios
        axios.post('/api/usuario/actualizar-usuario', actualizarusuario)
        .then(res => {
          console.log(res.data);
          //alert(res.data);
          Swal.fire('Correcto', 'El usuario se editó con éxito')
          navegar('/')
        })
        .catch(err => {
          console.log(err);
        });
      

    }

    return (
        <div className="container">
            <div className="row">
                <h2 className="mt-4">Editar usuario</h2>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" clfassName="form-control" value={nombre} onChange={(e) => { setNombre(e.target.value) }}></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
                    </div>

                    <button onClick={editarUsuario} className="btn btn-success">Editar usuario</button>
                </div>
            </div>
        </div>
    )
};
