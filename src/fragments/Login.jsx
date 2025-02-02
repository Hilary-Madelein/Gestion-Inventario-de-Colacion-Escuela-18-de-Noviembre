import React, { useState } from 'react';
import '../css/Login.css';
import '../css/Header.css';
import '../css/global.css';
import 'boxicons';
import Header from './Header';
//import { InicioSesion, obtener } from '../hooks/Conexion'
import { getRol, getToken, getUser, saveCorreo, saveRol, saveToken, saveUser } from '../utils/SessionUtil';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import mensajes from '../utils/Mensajes';
import logoIcon from '../img/escudo.png';

const Login = ({ onLogin }) => {

    const navegation = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [focused, setFocused] = useState({ correo: false, clave: false });

    const handleFocus = (field) => {
        setFocused({ ...focused, [field]: true });
    };

    const handleBlur = (field, hasValue) => {
        setFocused({ ...focused, [field]: hasValue });
    };


    /*const onSubmit = (data, event) => {
        var datos = {
            "correo": data.correo,
            "clave": data.clave
        };

        InicioSesion(datos).then((info) => {
            var infoAux = info.info;
            console.log(infoAux);
            if (info.code !== 200) {
                mensajes(info.msg, "error", "Error")
            } else {
                saveToken(infoAux.token);
                saveRol(infoAux.rol);
                saveUser(infoAux.user);
                saveCorreo(infoAux.correo);
                navegation("/principalusuario");
                mensajes(info.msg);
            }
        })
    };*/



    return (
        <div>

            <Header />
            <div className='background'>

            </div>

            <div className='container1'>
                <div className='content'>
                    <h2 className='text'>ESCUELA DE EDUCACIÓN BÁSICA "18 DE NOVIEMBRE"</h2>
                    <div className='text-sci'>
                        <h2 className='textoBienve'>Sistema de Gestión de Colación <br /></h2>
                        <p className='parrafo'> ¡Bienvenido a nuestra plataforma de gestión de inventarios! Nuestra herramienta te permite supervisar y manejar los productos de manera eficiente. 
                        Aquí puedes mantener el control de los niveles de stock y asegurar una distribución adecuada. Nos enfocamos en simplificar tu trabajo diario para que puedas dedicar 
                        más tiempo a lo que realmente importa: el bienestar de tus estudiantes. </p>

                    </div>
                </div>

                <div className='logreg-box'>
                    <div className='form-box login'>
                        <div className='iconEscudo'>
                            <img src={logoIcon} alt="Logo 18 de Noviembre" />
                        </div>
                        <h2>Iniciar Sesión</h2>

                        <form onSubmit={handleSubmit()}>
                            <div className='input-box'>
                                <span className='icon'><i className='bx bxs-envelope'></i></span>
                                <input type="email"
                                    {...register("correo", {
                                        required: {
                                            value: true,
                                            message: "Ingrese un correo"
                                        },
                                        pattern: {
                                            value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                                            message: "Ingrese un correo válido"
                                        }
                                    })}
                                    onFocus={() => handleFocus('correo')}
                                    onBlur={(e) => handleBlur('correo', e.target.value !== '')}
                                />
                                {errors.correo && <span className='mensajeerror'>{errors.correo.message}</span>}
                                <label className={focused.correo ? 'active' : ''}>Correo electrónico</label>
                            </div>

                            <div className='input-box'>
                                <span className='icon'><i className='bx bxs-lock-alt'></i></span>
                                <input type="password"
                                    {...register("clave", {
                                        required: {
                                            value: true,
                                            message: "Ingrese una contraseña"
                                        }
                                    })}
                                    onFocus={() => handleFocus('clave')}
                                    onBlur={(e) => handleBlur('clave', e.target.value !== '')}
                                />
                                {errors.clave && <span className='mensajeerror'>{errors.clave.message}</span>}
                                <label className={focused.clave ? 'active' : ''}>Contraseña</label>
                            </div>

                            <div className='boton-login'>
                                <button type='submit' className='button-login-ingresar'>Ingresar</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;