const axios = require('axios');
const MAIN = "https://bikewise.org:443/api/v2/incidents";

const baseParams = {
    proximity: "Berlin",
    proximity_square: 100
}

export const getBykes = (params) => {
    return axios.get(MAIN, {
        params : {...params, ...baseParams}
    });
}

export const getById = (id) => {
    return axios.get(`${MAIN}/${id}`)
}

// export const getMap = (params) => {
//     return axios.get("https://www.mapquestapi.com/staticmap/v5/map",{
//         params,
//         headers:{
//             "Access-Control-Allow-Origin" : "*",
//             "Accept":"*/*"
//         }
//     })
// }