import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import UserService from "../../services/user.service";
import ModalFormIteration from "./ModalFormIteration";
import TableIterations from "./TableIterations";

const Study = () => {
  const { idstudy } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false)

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

  if(loading){
    return <div>Cargando...</div>
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Estudio {content.software_name}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Nombre: {content.software_name}</li>
          <li type="disc">Tipo de software: {content.software_tipe}</li>
          <li type="disc">URL: {content.url}</li>
        </ul>
      </div>
      <TableIterations idstudy={idstudy}></TableIterations>
      <button onClick={handleShowModal} type="button" className="btn btn-primary">
        Nueva iteracion
      </button>
      <div style={{margin: 50}}>
      </div>
      <ModalFormIteration show={showModal} handleClose={handleCloseModal} idstudy={idstudy}/>
    </>
  )
}

export default Study