import { createSlice, createAsyncThunk, configureStore, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import Fuse from "fuse.js";

export const fetchPokemon = createAsyncThunk(
    "pokemon/fetchPokemon",
    async (pokemonId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const InitialPokemons = []

const fetch20Pokemons = async () => {
    
    for (let i = 1; i <= 30; i += 1) {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        InitialPokemons.push(response.data)
    }
}

await fetch20Pokemons()

export const pokemonCache = createSlice({
    name: "pokemonCache",
    initialState: {
        fetched: InitialPokemons,
        pageFetched: 2,
        searchResult: InitialPokemons,
    },
    reducers: {
        updateSearchResult(state, action) {
            const pokemons = state.fetched.map((pokemon) => {
                if (action.payload.type == "") {
                    return pokemon
                }
                else {
                    return pokemon.types.map((typeObj) => typeObj.type.name).includes(action.payload.type) ? pokemon : null
                }
            }).filter((pokemon) => pokemon !== null)
            if (action.payload.searchStr == "") {
                state.searchResult = pokemons
                return
            }
            const fuse = new Fuse(pokemons, {
                includeScore: false,
                keys: ["name"],
                findAllMatches: true,
            })
            const result = fuse.search(action.payload.searchStr).map((item) => pokemons[item.refIndex])
            state.searchResult = result
        }
    },
    extraReducers: (builder) => {
    }
})

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemon: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemon = action.payload;
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectedPokemonActions = pokemonSlice.actions;
export const pokemonCacheActions = pokemonCache.actions;

const store = configureStore({
    reducer: combineReducers({
        pokemon: pokemonSlice.reducer,
        pokemonCache: pokemonCache.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
