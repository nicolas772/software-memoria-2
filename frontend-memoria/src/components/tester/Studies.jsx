import { useState } from "react"
import TableStudies from "./TableStudies"
import ModalFormStudy from "./ModalFormStudy";

const Studies = ({ user }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false)
  return (
    <>
      <div className="container">
        <header>
          <h3>Lista de estudios</h3>
        </header>
      </div>
      <div style={{ margin: 20 }}></div>
      <TableStudies></TableStudies>
      <button onClick={handleShowCreateModal} type="button" className="btn btn-primary" style={{ width: '20%' }}>
        Nuevo Estudio
      </button>
      <div style={{ margin: 20 }}>
        <ModalFormStudy show={showCreateModal} handleClose={handleCloseCreateModal} userId={user.id} />
      </div>
    </>
  )
}
export default Studies