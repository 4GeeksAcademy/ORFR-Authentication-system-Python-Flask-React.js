import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/single.css";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const [data,setData] = useState({
		name:"",
		email: "",
		password: ""
	})

	const capturarData = (e)=> {
		let valor = e.target.value
		let inputname = e.target.name
		setData({...data,[inputname]:valor})
	}


	const enviarData = async (e) => {
		console.log(data);
		
		e.preventDefault()
		try{
			await actions.registrarUsuario(data)
			setData({
				name: "",
				email: "",
				password: ""
			})
		}catch(e){
			console.error(e);
			
		}
	}

	

	// const params = useParams();
//FORMULARIO CREACION DE USUARIO
	return (
		<div className="container m-5 p-5" id="form-create-user">
			<form onSubmit={enviarData}>
				<div class="row mb-3">
					<label for="input_new_name" class="col-sm-2 col-form-label">Nombre</label>
					<div class="col-sm-10">
					<input type="text" class="form-control" id="input_new_name" name="name" value={data.name} onChange={capturarData}/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="input_new_email" class="col-sm-2 col-form-label">Email</label>
					<div class="col-sm-10">
					<input type="email" class="form-control" id="input_new_email" name="email" value={data.email} onChange={capturarData}/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="input_new_password" class="col-sm-2 col-form-label">Contraseña</label>
					<div class="col-sm-10">
					<input type="password" class="form-control" id="input_new_password" name="password" value={data.password} onChange={capturarData}/>
					</div>
				</div>
				<button type="submit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear Usuario</button>
			</form>
			<Link to="/">
			<button type="button" className="btn btn-danger">Volver</button>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
