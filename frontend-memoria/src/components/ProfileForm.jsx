import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const validEmail = (value) => {
	if (!isEmail(value)) {
		return (
			"Ingrese un correo electrónico válido."
		);
	}
	return ("")
};

const validLength = (value, isUsername) => {
	if (value.length < 6 || value.length > 20) {
		if (isUsername) {
			return ("El nombre de usuario debe tener entre 6 y 20 caracteres.");
		} else {
			return ("La contraseña debe tener entre 6 y 20 caracteres.");
		}
	}
};

const validateDate = (year, month, day) => {
	// Verificar la cantidad de días en el mes
	const daysInMonth = new Date(year, month, 0).getDate();
	if (day < 1 || day > daysInMonth) {
		return ("Dia inválido para el mes")
	}
	const currentDate = new Date();
	const selectedDate = new Date(year, month - 1, day); // Month is 0-based

	if (selectedDate >= currentDate) {
		return ("La fecha de nacimiento debe ser anterior a la fecha actual.");
	}
	return ("")
};

function ProfileForm() {
	const currentUser = AuthService.getCurrentUser();
	const birthday = new Date(currentUser.birthday)
	const [isEditing, setIsEditing] = useState(false); // Nuevo estado para habilitar/deshabilitar campos
	const [username, setUsername] = useState(currentUser.username)
	const [usernameError, setUsernameError] = useState("")
	const [email, setEmail] = useState(currentUser.email);
	const [emailError, setEmailError] = useState("")
	const [sex, setSex] = useState(currentUser.sex)
	const [day, setDay] = useState(birthday.getDate())
	const [month, setMonth] = useState(birthday.getMonth() + 1)
	const [year, setYear] = useState(birthday.getFullYear())
	const [dateError, setDateError] = useState("")
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	console.log(currentUser)

	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
		if (username) {
			const error = validLength(username, true);
			if (!error) {
				setUsernameError("");
			}
		} else {
			setUsernameError("");
		}
	};

	const onBlurUsername = () => {
		if (username) {
			const error = validLength(username, true);
			setUsernameError(error);
		} else {
			setUsernameError("");
		}
	}

	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
		if (email) {
			const error = validEmail(email);
			if (!error) {
				setEmailError("");
			}
		} else {
			setEmailError("");
		}
	};

	const onBlurEmail = () => {
		if (email) {
			const error = validEmail(email);
			setEmailError(error);
		} else {
			setEmailError("");
		}
	}

	const onChangeSex = (e) => {
		const Sex = e.target.value
		setSex(Sex)
	}

	const onChangeDay = (e) => {
		const Day = e.target.value
		setDay(Day)
		if (Day && month && year) {
		  const error = validateDate(year, month, Day)
		  setDateError(error)
		}
	 }
  
	 const onChangeMonth = (e) => {
		const Month = e.target.value
		setMonth(Month)
		if (day && Month && year) {
		  const error = validateDate(year, Month, day)
		  setDateError(error)
		}
	 }
  
	 const onChangeYear = (e) => {
		const Year = e.target.value
		setYear(Year)
		if (day && month && Year) {
		  const error = validateDate(Year, month, day)
		  setDateError(error)
		}
	 }

	const handleEdit = () => {
		setIsEditing(true);
	}
	return (
		<>
			<div className='box-profile'>
				<div className="inputBox">
					<input
						type="text"
						className="form-control"
						value={username}
						onChange={onChangeUsername}
						onBlur={onBlurUsername}
						disabled={!isEditing} // Aplicar deshabilitado según el estado
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
						value={email}
						onChange={onChangeEmail}
						onBlur={onBlurEmail}
						disabled={!isEditing} // Aplicar deshabilitado según el estado
					>
					</input>
				</div>
				<div className="labelBox">
					<label>Email</label>
				</div>
				<div className="inputBox">
					<select value={sex} onChange={onChangeSex} disabled={!isEditing} required>
						<option value="Femenino">Femenino</option>
						<option value="Masculino">Masculino</option>
						<option value="No Informado">Prefiero no informar</option>
					</select>
				</div>
				<div className="labelBox">
					<label>Sexo</label>
				</div>
				<div className="inputBox">
					<select className="custom-select-day" onChange={onChangeDay} disabled={!isEditing} value={day} required>
						{Array.from({ length: 31 }, (_, index) => (
							<option key={index + 1} value={index + 1}>
								{index + 1}
							</option>
						))}
					</select>
					<select className="custom-select-month" onChange={onChangeMonth} disabled={!isEditing} value={month} required>
						{[
							"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
							"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
						].map((month, index) => (
							<option key={index} value={index + 1}>
								{month}
							</option>
						))}
					</select>
					<select className="custom-select-year" onChange={onChangeYear} disabled={!isEditing} value={year} required>
						{Array.from({ length: 124 }, (_, index) => (
							<option key={currentYear - index} value={currentYear - index}>
								{currentYear - index}
							</option>
						))}
					</select>
				</div>
				<div className="labelBox">
					<label>Fecha de Nacimiento</label>
				</div>
				<div className="buttons-div">
					<button type="button">
						Cambiar Contraseña
					</button>
					<button type="button" onClick={handleEdit}>
						Editar Datos
					</button>

				</div>
			</div>
		</>
	)
}

export default ProfileForm;
