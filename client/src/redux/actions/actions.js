import axios from "axios"
import { SET_ACTIVITIES, SET_BYNAME, SET_CONTINENT, SET_COUNTRIES, SET_FILTER, SET_ORDER, SET_PAGE, SET_REFRESH_COUNTRIES, SET_SEARCH, SET_SEASON, SET_VALUE_CONTINENTE, SET_VALUE_FILTRO, SET_VALUE_ORDEN, SET_VALUE_SEASON } from "./acTypes";

export const setFilter = (activity) => {
    return {
        type: SET_FILTER,
        payload: activity
    }
}

export const setSeason = (season) => {
    return {
        type: SET_SEASON,
        payload: season
    }
}

export const setActivities = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/activities");
            dispatch({
                type: SET_ACTIVITIES,
                payload:response.data
            });
        } catch (error) {
            return error
        }
    }
}

export const setByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/country", {
                params:{name}
            });
            dispatch({
                type: SET_BYNAME,
                payload:{
                    countries: response.data
                }
            }
            )
        } catch (error) {
            return error
        }
    }
}

export const setContinent = (continent) => {
    return {
        type: SET_CONTINENT,
        payload: continent
    }
}

export const setCountries = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/countries");
            dispatch({
                type: SET_COUNTRIES,
                payload:{
                    countries: response.data
                }
            }
            )
        } catch (error) {
            return error
        }
    }
}

export const setRefreshCountries = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/countries");
            dispatch({
                type: SET_REFRESH_COUNTRIES,
                payload: response.data
            }
            )
        } catch (error) {
            return error
        }
    }
}

export const setOrder = (orderBy, order) => {
    return {
      type: SET_ORDER,
      payload: {
        orderBy,
        order,
      },
    };
};

export const setPage = (number) => {
    return {
        type: SET_PAGE,
        payload: number
    }
}

export const setValueOrden = (value) => {
    return {
        type: SET_VALUE_ORDEN,
        payload: {
            orden:value
        }
    }
}

export const setValueFiltro = (value) => {
    return {
        type: SET_VALUE_FILTRO,
        payload: {
            filtro:value
        }
    }
}

export const setValueContinente = (value) => {
    return {
        type: SET_VALUE_CONTINENTE,
        payload: {
            continente:value
        }
    }
}

export const setValueSeason = (value) => {
    return {
        type: SET_VALUE_SEASON,
        payload: {
            season:value
        }
    }
}

export const setSearch = (value) => {
    return {
        type: SET_SEARCH,
        payload: value
    }
}