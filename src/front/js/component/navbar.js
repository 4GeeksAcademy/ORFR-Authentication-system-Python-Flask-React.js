import React, { useContext,useState }from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<Link to="/user">
						<button className="btn btn-info">Mi Perfil</button>
					</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-info">Iniciar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
