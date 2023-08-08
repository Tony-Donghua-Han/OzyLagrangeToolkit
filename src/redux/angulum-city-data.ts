import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import {
    City,
    ListCitiesWithSortedTimeQuery,
    ListCitiesWithSortedTimeQueryVariables,
    ModelSortDirection,
} from "../API";
import * as queries from "../graphql/queries";

interface AngulumCityDataState {
    requestState: "idle" | "loading" | "succeeded" | "failed";
    cities: City[];
    error: string | undefined;
}

const initialState: AngulumCityDataState = {
    requestState: "idle",
    cities: [],
    error: undefined,
};

const angulumCityDataSlice = createSlice({
    name: "angulumCityData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCities.fulfilled, (state, action) => {
            const cities = action.payload;
            state.cities = cities;
            state.requestState = "succeeded";
            state.error = undefined;
        });
        builder.addCase(fetchCities.rejected, (state, action) => {
            state.requestState = "failed";
            state.error = action.error.message;
        });
        builder.addCase(fetchCities.pending, (state) => {
            state.requestState = "loading";
        });
    },
});

export const fetchCities = createAsyncThunk("angulumCityData/fetch", async () => {
    const vars: ListCitiesWithSortedTimeQueryVariables = {
        type: "CITY",
        limit: 1000,
        sortDirection: ModelSortDirection.DESC,
    };
    const apiData = await API.graphql<GraphQLQuery<ListCitiesWithSortedTimeQuery>>({
        query: queries.listCitiesWithSortedTime,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        variables: vars,
    });
    if (apiData.data === undefined) throw new Error("Failed to fetch cities");
    if (apiData.data.listCitiesWithSortedTime === undefined || apiData.data.listCitiesWithSortedTime === null)
        throw new Error("Failed to fetch cities");
    const citiesFromAPI = apiData.data.listCitiesWithSortedTime.items.filter((city) => city !== null) as City[];
    return citiesFromAPI;
});

export default angulumCityDataSlice.reducer;
