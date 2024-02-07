import {
  SET_ACTIVITIES,
  SET_BYNAME,
  SET_CONTINENT,
  SET_COUNTRIES,
  SET_FILTER,
  SET_ORDER,
  SET_REFRESH_COUNTRIES,
  SET_SEASON,
} from "../actions/acTypes";

const initialState = {
  countries: [],
  allCountries: [],
  fillCountries: [],
  activities: [],
};

export const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload.countries,
        allCountries: action.payload.countries,
        fillCountries: [],
      };
    case SET_REFRESH_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload
      }
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case SET_FILTER:
      let filterCountries;
      const activity = action.payload;
      if (activity === "tienen") {
        filterCountries = [...state.allCountries].filter((c) => {
          return c.Activities.length > 0;
        });
      } else {
        filterCountries = [...state.allCountries].filter((c) => {
          return c.Activities && c.Activities.some((a) => a.name === activity);
        });
      }
      return {
        ...state,
        countries: filterCountries,
        fillCountries: filterCountries,
      };
    case SET_SEASON:
      const season = action.payload;
      let fCountries;
      if (state.fillCountries.length > 0) {
        fCountries = [...state.fillCountries].filter((c) => {
          return c.Activities && c.Activities.some((a) => a.season === season);
        });
      } else {
        fCountries = [...state.allCountries].filter((c) => {
          return c.Activities && c.Activities.some((a) => a.season === season);
        });
      }
      return {
        ...state,
        countries: fCountries,
        fillCountries: fCountries
      };
    case SET_BYNAME:
      return {
        ...state,
        countries: action.payload.countries,
        allCountries: action.payload.countries,
      };
    case SET_ORDER:
      const { orderBy, order } = action.payload;
      let orderedCountries;

      if (orderBy === "name") {
        orderedCountries = [...state.countries].sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (order === "asc") {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
      } else if (orderBy === "population") {
        orderedCountries = [...state.countries].sort((a, b) => {
          if (order === "asc") {
            return a.population - b.population;
          } else {
            return b.population - a.population;
          }
        });
      }
      return {
        ...state,
        countries: orderedCountries,
      };
    case SET_CONTINENT:
      let countriesByCont;
      if (action.payload === "todos") {
        countriesByCont = state.allCountries;
      } else {
        const continent = action.payload;
        if (state.fillCountries.length > 0) {
          countriesByCont = [...state.fillCountries].filter(
            (c) => c.continent === continent
          );
        } else {
          countriesByCont = [...state.allCountries].filter(
            (c) => c.continent === continent
          );
        }
      }
      return {
        ...state,
        countries: countriesByCont,
      };
    default:
      return state;
  }
};
