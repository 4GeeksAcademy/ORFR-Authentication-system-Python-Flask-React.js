import React, { useContext,useState,useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link,useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [showButton, setShowButton] = useState(false);
	const [welcome, setWelcome] = useState("Hola, Invitado");
	const navigate = useNavigate();

	useEffect(() => {
	
		if (localStorage.getItem("token")) {
		  setShowButton(true);
		  setWelcome("Hola, "+localStorage.getItem("name"))
		} else {
		  setShowButton(false);
		}
	  },[]);

	const loginOff = async () => {
		
		// para pausar el proceso y que no se actualice la pag.
			try{
				await actions.cerrarSesion();
		
				// if ( !localStorage.getItem("token")) {
					navigate("/")
					window.location.reload();			
				// }
			}catch(e){
				console.error(e);
				
			}
		}

	return (
		<div className="text-center mt-5">
			<h1>{welcome}</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			{showButton && (
        		<button onClick={loginOff} type="button" className="btn btn-danger">Cerrar Sesion</button>
      		)}
			<div className="alert alert-info">
				
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
