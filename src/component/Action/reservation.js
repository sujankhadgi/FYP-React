import axios from "axios"

const url = 'http://localhost:4000'

export const addReservation = ({
    user_id,
    bus_id,
    seats_number,
    departure_date
}) => {
    return async function () {
        await axios.post(`${url}/book/seats`, {
            "user_id": user_id,
            "bus_id": bus_id,
            "seats_number": seats_number,
            "departure_date": departure_date
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((docs) => {
                console.log(docs.data)
            })
            .catch((e) => {
                console.log("Error", e)
            })
    }
}

export const deleteReservation = ({
    user_id,
    bus_id
}) => {
    return async function () {
        await axios.delete(`${url}/book/seats`, {
            "user_id": `${user_id}`,
            "bus_id": bus_id
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then((docs) => {
                console.log(docs.data)
            })
            .catch((e) => {
                console.log("Error", e)
            })
    }
}