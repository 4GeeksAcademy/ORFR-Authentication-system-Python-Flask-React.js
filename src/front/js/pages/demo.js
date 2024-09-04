import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	

	const [dataLogin,setDataLogin] = useState({
		email: "",
		password: ""
	})

	const capturarData = (e)=> {
		let valor = e.target.value
		let inputname = e.target.name
		setDataLogin({...dataLogin,[inputname]:valor})
	}


	const iniciarSesion = async (e) => {
		console.log(dataLogin);
		
		e.preventDefault() // para pausar el proceso y que no se actualice la pag.
		try{
			await actions.Login(dataLogin)
			setDataLogin({
				email: "",
				password: ""
			})
			if ( localStorage.getItem("token")) {
				navigate("/user")
				console.log(localStorage.getItem("token"));
				
			}
		}catch(e){
			console.error(e);
			
		}
	}



//FORMULARIO INICIO DE SESION
	return (
		<div className="container m-5 p-5">
			<form onSubmit={iniciarSesion}>
			<div className="mb-3">
				<label for="input_email" className="form-label">Email</label>
				<input type="email" className="form-control" id="input_email" name="email" aria-describedby="emailHelp" onChange={capturarData}/>
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label for="input_password" className="form-label">Contraseña</label>
				<input type="password" className="form-control" id="input_password" name="password" onChange={capturarData}/>
			</div>
			<button type="submit" className="btn btn-primary">Ingresar</button>
			</form>
			<Link to="/">
			<button type="button" className="btn btn-danger">Volver</button>
			</Link>
			<Link to="/single">
			<button type="button" className="btn btn-success">Crear Usuario</button>
			</Link>
		</div>
	);
};
