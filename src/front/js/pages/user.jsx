import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const User = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	console.log(store.userActive)

//PERFIL

	useEffect(() => {
    
    if (!localStorage.getItem("token")) { 
      navigate('/demo');
    }
  }, [navigate]);

		return (
			<div className="container m-5 p-5">
				<h1>Perfil de  {localStorage.getItem("name")}</h1> 
				<ul>

				</ul>
			</div>
		);

  }
        
   
	

   