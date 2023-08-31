import React, { useState } from "react";

function ProfileForm() {
	const handleSubmit = () => {
		console.log("enviar")
	}
	return (
		<>
			<div className='box-profile'>
				<div className="inputBox">
					<input
						type="text"
						className="form-control"
					>
					</input>
				</div>
				<div className="labelBox">
					<label>Nombre de Usuario</label>
				</div>
				<div className="inputBox">
					<input
						type="text"
						className="form-control"
					>
					</input>
				</div>
				<div className="labelBox">
					<label>Email</label>
				</div>
				<div className="inputBox">
					<input
						type="text"
						className="form-control"
					>
					</input>
				</div>
				<div className="labelBox">
					<label>Sexo</label>
				</div>
				<div className="inputBox">
					<input
						type="text"
						className="form-control"
					>
					</input>
				</div>
				<div className="labelBox">
					<label>Fecha de Nacimiento</label>
				</div>
				<div className="buttons-div">
					<button type="button">
						Cambiar Contraseña
					</button>
					<button type="button">
						Editar Datos
					</button>

				</div>
			</div>
		</>
	)
}

export default ProfileForm;
