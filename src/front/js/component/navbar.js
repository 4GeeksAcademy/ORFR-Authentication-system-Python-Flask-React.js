import React, { useContext,useState }from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Inicio</span>
				</Link>
				
					<button onClick={()=>actions.getDataProfile()} className="btn btn-info">Mi Perfil</button>
				</div>	
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-info">Iniciar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
