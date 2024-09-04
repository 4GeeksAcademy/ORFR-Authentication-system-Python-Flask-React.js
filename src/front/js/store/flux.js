import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userActive: [],

		},
		actions: {
			// Use getActions to call a function within a fuction


			registrarUsuario: async (usuario) => {
				const store = getStore();
				try{
					// fetching data from the backend
					let resp = await fetch('https://solid-space-eureka-699j979v649qh5w4g-3001.app.github.dev/api/registrar', {
						method: 'POST',
						body: JSON.stringify(usuario),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})
					let data = await resp.json()
					console.log(data.done);
					if (data.done) {
						Swal.fire("Hecho!", `${(data.done)}`, "success");
					}
					else {
						Swal.fire("Oh no!", `${(data.error)}`, "error");
					}
					
				}catch(error){
					console.log("Error loading message from backend ", error)
				}
			},


			Login: async (usuarioLogin) => {
				const store = getStore();
				try{
					// fetching data from the backend
					let resp = await fetch('https://solid-space-eureka-699j979v649qh5w4g-3001.app.github.dev/api/login', {
						method: 'POST',
						body: JSON.stringify(usuarioLogin),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})
					let data = await resp.json()
					console.log(data.name);
					if (data.name) {
						// alert("Bienvenid@ "+ data.name)
						localStorage.setItem("token" , data.token)
						localStorage.setItem("name" , data.name)
						localStorage.setItem("email" , data.email)
					}
					else {
						Swal.fire("Oh no!", `${(data.error)}`, "error");
					}
					
				}catch(error){
					console.log("Error loading message from backend ", error)
				}
			},


			getDataProfile: async () => {
				const store = getStore();
				let token = localStorage.getItem("token");
				 if (!token) {
					Swal.fire("Hey!", "Primero debes iniciar sesión", "warning");
					return
				 }
				try{
					let resp = await fetch('https://solid-space-eureka-699j979v649qh5w4g-3001.app.github.dev/api/user', {
						method: 'GET',
						headers: {
							Authorization:`Bearer ${token}`
						  },	
					})
					let data = await resp.json()
					console.log(data);
					setStore({...getStore(), userActive: data })
					window.location.href = '/user'

					
				}catch(error){
					console.log("Error loading message from backend ", error)
				}
			},

			cerrarSesion: async () => {
				localStorage.clear();
				setStore({ userActive: [] })
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
