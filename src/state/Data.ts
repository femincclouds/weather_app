import create from "zustand";
import { emptyFunction } from "../utils/common";
import { createSelectors } from "./state";

const initialState: IAppState = {
  countryDetails: {
    capital: "",
    population: undefined,
    latlng: [],
    flag: undefined,
  },
  weatherDetails: {
    temperature: undefined,
    waether_icons: "",
    wind_speed: undefined,
    precip: undefined,
  },
  setCountryDetails: emptyFunction,
  setWeatherDetails: emptyFunction,
};

export const useAppState = create<IAppState>((set, get) => ({
  ...initialState,
  setCountryDetails: (countryDetails) => set({ countryDetails }),
  setWeatherDetails: (weatherDetails) => set({ weatherDetails }),
}));

export const appStateSelectors = createSelectors(initialState);

export interface IAppState {
  countryDetails: any;
  weatherDetails: any;
  setCountryDetails: (country: any) => void;
  setWeatherDetails: (weather: any) => void;
}

export interface ICountryDetails {
  capital: string;
  population?: number;
  latlng: number[];
  flag: any;
}

export interface IWeatherDetails {
  temperature?: number;
  waether_icons: any;
  wind_speed?: number;
  precip?: number;
}
