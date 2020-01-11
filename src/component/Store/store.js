import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import Buses from "../Reducer/buses"
import Routes from "../Reducer/routes"
import SingleBus from "../Reducer/singleBus"
import GetAllRoutes from "../Reducer/getAllRoutes"

export default () => {
    const store = createStore(
        combineReducers({
            Buses,
            searched_routes: Routes,
            SingleBus,
            GetAllRoutes
        }), applyMiddleware(thunk)
    )

    return store;
}