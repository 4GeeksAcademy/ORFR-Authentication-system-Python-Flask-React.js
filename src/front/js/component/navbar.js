import React, { useContext,useState,useEffect }from "react";
import { Link,useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
const { store, actions } = useContext(Context);
const navigate = useNavigate();
// const [showButton, setShowButton] = useState(true);
const [btnText, setBtnText] = useState("Iniciar Sesion");
const [btnClass, setBtnClass] = useState("btn btn-info");


useEffect(() => {
	
	if (!localStorage.getItem("token")) {
	  setBtnText("Iniciar Sesion")
	  setBtnClass("btn btn-info")
	//   actions.getDataProfile()
	} else {
	//   (false);
	  setBtnText("Cerrar Sesion")
	  setBtnClass("btn btn-danger")
	//   loginOff();
	}
  },);

  const toWindowLogin =  () => {
			navigate("/demo");
		}




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

	const btnClick = async () => {
		!localStorage.getItem("token") ? toWindowLogin() : loginOff();
	}


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
						<button onClick={btnClick} className={btnClass}>{btnText}</button>
				</div>
			</div>
		</nav>
	);
};
