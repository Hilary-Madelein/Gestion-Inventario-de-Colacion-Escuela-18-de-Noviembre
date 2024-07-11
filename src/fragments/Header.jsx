import { borrarSesion } from '../utils/SessionUtil';
import { useNavigate } from 'react-router';
import { getRol } from '../utils/SessionUtil';
import '../css/Header.css';
import 'boxicons';


const BarraMenu = () => {
    const navegation = useNavigate();
    const rol = getRol();

    const handleClick = () => {
        borrarSesion();
        navegation('/principal');
    }

    return (
        <header className='header1'>
            <a href="/principalusuario" className="logo">NOMBRE APP</a>

            <input type="checkbox" id='check' />
            <label htmlFor="check" className='icons1'>
                <i className='bx bx-menu' id='menu-icon'></i>
                <i className='bx bx-x' id='close-icon'></i>
            </label>


            <nav className='navbar1'>
                {rol === 'ADMINISTRADOR' && (
                    <>
                        <a href="/usuariosregistrados">Usuarios</a>
                        <a href="/verpeticiones">Peticiones</a>
                    </>
                )}
                {rol === 'USUARIO' && (
                    <>
                        <a href="/api">API</a>
                        <a href="/principal">Monitor UV</a>
                    </>
                )}
                <a href="/perfil">Perfil</a>
                <a href="/principal" onClick={handleClick}>Cerrar Sesión</a>
            </nav>
        </header>

    )
}

export default BarraMenu;