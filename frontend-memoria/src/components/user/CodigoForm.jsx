import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user.service';
import InfoModal from './InfoModal';

function CodigoForm() {
  const [codigo, setCodigo] = useState('');
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, ''); // Eliminar todos los caracteres que no sean números
    setCodigo(numericValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la acción de enviar el código
    const codigo_iteracion_int = parseInt(codigo, 10)
    UserService.getIteration(codigo_iteracion_int).then(
      (response) => {
        const data = response.data
        if (data) {
          if (data.state === 'Activa') {
            navigate(`/user/doiteration/${codigo_iteracion_int}`)
          } else {
            setTitleModal('Información')
            setBodyModal('La iteracion ingresada tiene el siguiente estado: '+data.state)
            handleShowInfoModal()
          }
        } else {
          setTitleModal('Advertencia')
          setBodyModal('No hay registro de esta iteracion')
          handleShowInfoModal()
        }
      },
      (error) => {
        console.log(error)
      }
    )
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ingrese el código de 6 dígitos:
          <input
            type="text"
            value={codigo}
            onChange={handleChange}
            maxLength={6}
            pattern="[0-9]*" // Añadir el atributo pattern para dispositivos móviles
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>

      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
    </div>
  );
}

export default CodigoForm;
