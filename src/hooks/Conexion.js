const URL = 'http://localhost:3006/api/';
export const URLBASE = "http://localhost:3006"; 

export const InicioSesion = async (data) => {
    const headers = {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/sesion", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
        
    })).json();
    return datos;
}



export const ObtenerGet = async (key, url) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URL}/${url}`, {
        method: "GET",
        headers: headers,
    })).json();
    console.log("aaaa", datos);
    return datos;
}

export const ObtenerPost = async (key, url, bodyData) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };

    console.log("eee", bodyData);

    try {
        const response = await fetch(`${URL}/${url}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(bodyData)
        });
        const datos = await response.json();
        console.log("wwww", datos);
        return datos;

    } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
        throw error;
    }
}



export const Obtener = async (id, key, url) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URL}${url}${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
} 

export const PostGuardar = async (data, key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URL}/${urls}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}

export const GuardarImages = async (data, key, urls) => {
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data, // Envía el FormData directamente como cuerpo
    };
    try {
        const response = await fetch(URL + urls, requestOptions);

        const datos = await response.json();

        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}