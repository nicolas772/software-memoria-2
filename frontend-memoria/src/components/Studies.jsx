import { useNavigate } from "react-router-dom"

const Studies = () => {
  const navigate = useNavigate()
  
  const handleBtnNuevoEstudio = () => {
    navigate('/studies/new-study')
  }
  
  return (
    <>
    <div className="container">
      <header className="jumbotron">
        <h3>Lista de estudios</h3>
      </header>
    </div>
    <button onClick={handleBtnNuevoEstudio} type="button" className="btn btn-light">
      Nuevo Estudio
    </button>
    </>
  )
}
export default Studies