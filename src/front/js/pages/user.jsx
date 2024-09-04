import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const User = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    const loginOff = async (e) => {
		
		e.preventDefault() // para pausar el proceso y que no se actualice la pag.
		try{
			await actions.cerrarSesion();
	
			if ( !localStorage.getItem("token")) {
				navigate("/")				
			}
		}catch(e){
			console.error(e);
			
		}
	}


//FORMULARIO INICIO DE SESION
    if (localStorage.getItem("token")) {
        
   
	return (
		<div className="container m-5 p-5">
			<h1>Bienvenid@ {localStorage.getItem("name")}</h1> 
            <button onClick={loginOff} type="button" className="btn btn-danger">Cerrar Sesion</button>
		</div>
	);
}
    else{
         navigate("/demo")
        alert("Debe iniciar sesion")
    }
};