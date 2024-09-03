import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
//FORMULARIO INICIO DE SESION
	return (
		<div className="container m-5 p-5">
			<form>
			<div className="mb-3">
				<label for="input_email" className="form-label">Email</label>
				<input type="email" className="form-control" id="input_email" aria-describedby="emailHelp"/>
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label for="input_password" className="form-label">Contraseña</label>
				<input type="password" className="form-control" id="input_password"/>
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
