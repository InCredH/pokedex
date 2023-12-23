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

export const fetchNextPokemons = createAsyncThunk(
    "pokemon/fetchNextPokemons",
    async (_, { getState, dispatch }) => {
      const state = getState();
      let pageFetched = state.pokemonCache.pageFetched;
      let pokemons = [...state.pokemonCache.fetched]
  
      try {
          for (let i = pageFetched * 10 + 1; i <= (pageFetched + 1) * 10; i += 1) {
              const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
              const pokemon = response.data
              pokemons.push(pokemon)
          }
          return pokemons
      }
      catch(error) {
        return rejectWithValue(error.message)
      }
    }
  );

const InitialPokemons = []

const fetchInitialPokemons = async () => {

    for (let i = 1; i <= 30; i += 1) {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        InitialPokemons.push(response.data)
    }
}

await fetchInitialPokemons()

export const pokemonCache = createSlice({
    name: "pokemonCache",
    initialState: {
        fetched: InitialPokemons,
        pageFetched: 3,
        searchResult: InitialPokemons,
        searchStr: "",
        searchType: ""
    },
    reducers: {
        updateSearchResult(state, action) {
            state.searchStr = action.payload.searchStr
            state.searchType = action.payload.type
            const pokemons = state.fetched.map((pokemon) => {
                if (state.searchType == "") {
                    return pokemon
                }
                else {
                    return pokemon.types.map((typeObj) => typeObj.type.name).includes(state.searchType) ? pokemon : null
                }
            }).filter((pokemon) => pokemon !== null)
            if (state.searchStr == "") {
                state.searchResult = pokemons
                return
            }
            const fuse = new Fuse(pokemons, {
                includeScore: false,
                keys: ["name"],
                findAllMatches: true,
            })
            const result = fuse.search(state.searchStr).map((item) => pokemons[item.refIndex])
            state.searchResult = result
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNextPokemons.fulfilled, (state, action) => {
            state.fetched = action.payload
            state.searchResult = action.payload
            state.pageFetched = state.pageFetched + 1
        })
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
