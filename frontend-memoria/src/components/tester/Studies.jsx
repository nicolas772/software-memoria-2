import { useNavigate } from "react-router-dom"
import TableStudies from "./TableStudies"
import Navbar from "../Navbar";
const Studies = () => {
  const navigate = useNavigate()

  const handleBtnNuevoEstudio = () => {
    navigate('/studies/new-study')
  }

  return (
    <>
      <div className="container">
        <header>
          <h3>Lista de estudios</h3>
        </header>
      </div>
      <div style={{margin: 20}}></div>
      <TableStudies></TableStudies>
      <button onClick={handleBtnNuevoEstudio} type="button" className="btn btn-primary">
        Nuevo Estudio
      </button>
      <div style={{margin: 20}}>
      </div>
    </>
  )
}
export default Studies