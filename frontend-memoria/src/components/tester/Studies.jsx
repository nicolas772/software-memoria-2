import { useState, useEffect } from "react"
import TableStudies from "./TableStudies"
import ModalFormStudy from "./ModalFormStudy";
import UserService from "../../services/user.service";

const Studies = ({ user }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [content, setContent] = useState([]);
  const [reloadStudy, setReloadStudy] = useState(false); // Variable para forzar la recarga del componente
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
    setReloadStudy(!reloadStudy);
  }
  useEffect(() => {
    UserService.getStudies().then(
      (response) => {
        setContent(response.data);
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
  }, [reloadStudy]);


  return (
    <>
      <div className="container">
        <header>
          <h3>Lista de estudios</h3>
        </header>
      </div>
      <div style={{ margin: 20 }}></div>
      <TableStudies content={content}></TableStudies>
      <button onClick={handleShowCreateModal} type="button" className="btn btn-primary" style={{ width: '20%' }}>
        Nuevo Estudio
      </button>
      <div style={{ margin: 20 }}>
        <ModalFormStudy show={showCreateModal} 
        handleClose={handleCloseCreateModal} 
        userId={user.id}/>
      </div>
    </>
  )
}
export default Studies