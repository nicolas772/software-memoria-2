import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import UserService from "../services/user.service";

const Study = () => {
  const { idstudy } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserService.getStudy(idstudy).then(
      (response) => {
        setContent(response.data);
        setLoading(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  const handleBtnNuevaIteracion = () => {
    console.log('nueva iteracion')
  }

  if(loading){
    return <div>Cargando...</div>
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Estudio {idstudy}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Nombre: {JSON.stringify(content.software_name)}</li>
          <li type="disc">Tipo de software: {JSON.stringify(content.software_tipe)}</li>
          <li type="disc">URL: {JSON.stringify(content.url)}</li>
        </ul>
      </div>
      <button onClick={handleBtnNuevaIteracion} type="button" className="btn btn-primary">
        Nueva iteracion
      </button>
    </>
  )
}

export default Study