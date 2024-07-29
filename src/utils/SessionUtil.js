export const borrarSesion = () => {
    localStorage.clear();
}

export const saveToken = (token) => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem('token');
}

//OBTENER ROL
export const saveRol = (rol) => {
    localStorage.setItem("rol", rol);
}

export const getRol = () => {
    return localStorage.getItem('rol');
}

export const estaSesion = () => {
    var token = localStorage.getItem('token');
    return (token && (token != 'undefined' || token != null || token != 'null'));
}

//USUARIO
// Guardar usuario en el almacenamiento local
export const saveUser = (user) => {
    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);
}

// Obtener usuario desde el almacenamiento local
export const getUser = () => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
        try {
            return JSON.parse(userJSON);
        } catch (e) {
            console.error('Error al analizar los datos del usuario:', e);
            // Manejo del error, podría ser retornar null o un objeto vacío
            return null;
        }
    }
    return null;
};

//CORREO
export const saveCorreo = (correo) => {
    localStorage.setItem("correo", correo);
}

export const getCorreo = () => {
    return localStorage.getItem('correo');
}

// GUARDAR PRODUCTO DE SELECCION
export const saveProductoRegistrado = (productoId) => {
    localStorage.setItem("productoId", productoId);
    console.log("Producto ID guardado:", productoId);
}


export const getProductoRegistrado = () => {
    return localStorage.getItem("productoId");
}

// GUARDAR BODEGA ID
export const saveBodega = (bodegaId) => {
    localStorage.setItem("bodegaId", bodegaId);
    console.log("BODEGA ID guardado:", bodegaId);
}


export const getBodega = () => {
    return localStorage.getItem("bodegaId");
}

// GUARDAR BODEGA KARDEX
export const saveKardex = (kardex) => {
    if (kardex && kardex.id) {
        localStorage.setItem('kardex', JSON.stringify(kardex));
    }
};

export const getKardex = () => {
    const kardex = localStorage.getItem('kardex');
    return kardex ? JSON.parse(kardex) : null;
};






