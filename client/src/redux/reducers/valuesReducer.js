import {
  SET_PAGE,
  SET_SEARCH,
  SET_VALUE_CONTINENTE,
  SET_VALUE_FILTRO,
  SET_VALUE_ORDEN,
  SET_VALUE_SEASON,
} from "../actions/acTypes";

const initialState = {
  page: 1,
  search: "",
  orden: "name,asc",
  filtro: "",
  continente: "todos",
  season: "",
};

export const valuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_VALUE_ORDEN:
      return {
        ...state,
        orden: action.payload.orden,
      };
    case SET_VALUE_FILTRO:
      return {
        ...state,
        filtro: action.payload.filtro,
      };
    case SET_VALUE_CONTINENTE:
      return {
        ...state,
        continente: action.payload.continente,
      };
    case SET_VALUE_SEASON:
      return {
        ...state,
        season: action.payload.season,
      };
    default:
      return state;
  }
};