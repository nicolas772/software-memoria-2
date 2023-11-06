import { useState, useEffect } from "react"
import TableStudies from "./TableStudies"
import TableStudies2 from "./TableStudies2"
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
    <div style={{ margin: '20px' }}>
      <div className="header-pages">
        <header>
          <h3>Mis Estudios</h3>
        </header>
      </div>
      <button
        onClick={handleShowCreateModal}
        type="button"
        className="btn button-primary"
        
      >
        Crear Estudio
      </button>

      <div style={{ margin: 20 }}></div>
      <TableStudies2 content={content}></TableStudies2>

      <div style={{ margin: 20 }}>
        <ModalFormStudy show={showCreateModal}
          handleClose={handleCloseCreateModal}
          userId={user.id} />
      </div>
    </div>
  )
}
export default Studies