import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom"
import { LogIn } from "./Components/LogIn/LogIn"
import { SignIn } from "./Components/SignIn/SignIn"
import { Posts } from "./Components/Posts/Posts"
import { Wall } from "./Components/Wall/Wall"
import { Error } from "./Components/Error/Error"
import './index.css';
import { useState, useEffect } from "react"
import axios from "axios"


function App() {


  const [inicioSesion, setInicioSesion] = useState(false);
  const [inicioSesionInfo , setInicioSesionInfo] = useState({});

  const validarCookie = async ( )=>{

    const ulrValidar = 'http://localhost:4000/API/auth'
    const result = await axios.get(ulrValidar,  { withCredentials:true} );
    const resultData = (await result).data;

    if (result.status ===200){

      setInicioSesion(true);
      setInicioSesionInfo(resultData);

    }
    


  }

  useEffect ( ()=>{

    validarCookie();

  } ,  [] );


  return (
    <>
      <BrowserRouter>
        <Routes>
          {  inicioSesion ? (<Route path="/"  element={<Wall/>}/ >) :  
                            <Route path="/" element ={<LogIn prop1 = {setInicioSesion}  />} /> }
          <Route path="/crearUsuario" element ={<SignIn/>}></Route>
          { inicioSesion ?  (<Route path="/crearPost" element ={<Posts infoUsuario = {inicioSesionInfo} />} />) : <></> }
          { inicioSesion ? (<Route path="/wall" element ={<Wall/>} />) :<></> }
          <Route path="*" element ={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
