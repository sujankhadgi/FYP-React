import axios from "axios";
import { SEARCH_ROUTES, GET_ALL_ROUTES } from "./type"

const url = 'http://localhost:4000'

export const AddRoutes = ({
    from,
    to,
    highway,
    bus_id
}) => {
    const headers = {
        "Content-Type": 'application/json'
    }
    return async function () {
        await axios.post(`${url}/admin/route`, {
            "from": from,
            "to": to,
            "highway": highway,
            "bus_id": bus_id
        }, {
            headers
        })
            .then((docs) => {
                console.log(docs.status)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}


export const getRoutes = ({
    from,
    to,
    no_of_people
}) => {
    const headers = {
        "Content-Type": 'application/json'
    }

    return async function (dispatch) {
        await axios.put(`${url}/admin/route`, {
            "from": from,
            "to": to,
            "No_of_seats": no_of_people
        },
            {
                headers
            }
        ).then((docs) => {
            console.log("GETTING ROUTES")
            dispatch({ type: SEARCH_ROUTES, payload: docs.data })
        }).catch((e) => {
            console.log("Error while Search Place", e)
        })
    }
}

export const getAllRoutes = () => {
    const headers = {
        "Content-Type": 'application/json'
    }

    return async function (dispatch) {
        await axios.get(`${url}/admin/route`, { headers })
            .then((docs) => {
                if (docs.data.message === "Success") {
                    dispatch({ type: GET_ALL_ROUTES, payload: docs.data.data })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
}