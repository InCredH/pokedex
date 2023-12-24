import {
  createSlice,
  createAsyncThunk,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
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

export const fetchPokemonByName = createAsyncThunk(
  "pokemon/fetchPokemonByName",
  async (pokemonName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
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
    let pokemons = [...state.pokemonCache.fetched];

    try {
      for (let i = pageFetched * 10 + 1; i <= (pageFetched + 1) * 10; i += 1) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const pokemon = response.data;
        pokemons.push(pokemon);
        setTimeout(() => {}, 800);
      }
      return pokemons;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInitialPokemons = createAsyncThunk(
  "pokemon/fetchInitialPokemons",
  async (_, { getState, dispatch }) => {
    const InitialPokemons = [];
    for (let i = 1; i <= 30; i += 1) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      InitialPokemons.push(response.data);
    }
    return InitialPokemons;
  }
);

export const pokemonCache = createSlice({
  name: "pokemonCache",
  initialState: {
    fetched: [],
    pageFetched: 0,
    searchResult: [],
    searchStr: "",
    searchType: "",
  },
  reducers: {
    updateSearchResult(state, action) {
      state.searchStr = action.payload.searchStr;
      state.searchType = action.payload.type;
      const pokemons = state.fetched
        .map((pokemon) => {
          if (state.searchType == "") {
            return pokemon;
          } else {
            return pokemon.types
              .map((typeObj) => typeObj.type.name)
              .includes(state.searchType)
              ? pokemon
              : null;
          }
        })
        .filter((pokemon) => pokemon !== null);
      if (state.searchStr == "") {
        state.searchResult = pokemons;
        return;
      }
      const fuse = new Fuse(pokemons, {
        includeScore: false,
        keys: ["name", "id"],
        findAllMatches: true,
      });
      const result = fuse
        .search(state.searchStr)
        .map((item) => pokemons[item.refIndex]);
      state.searchResult = result;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNextPokemons.fulfilled, (state, action) => {
      state.fetched = action.payload;
      state.searchResult = action.payload;
      state.pageFetched = state.pageFetched + 1;
    });
    builder.addCase(fetchInitialPokemons.fulfilled, (state, action) => {
      state.fetched = action.payload;
      state.searchResult = action.payload;
      state.pageFetched = 3;
    });
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.searchResult = [action.payload]; // Update search results with the fetched Pokémon
    });
  },
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemon: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPokemon(state, action) {
      state.pokemon = null;
    },
  },
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
      })
      .addCase(fetchNextPokemons.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchNextPokemons.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchNextPokemons.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const selectedPokemonActions = pokemonSlice.actions;
export const pokemonCacheActions = pokemonCache.actions;

const store = configureStore({
  reducer: combineReducers({
    pokemon: pokemonSlice.reducer,
    pokemonCache: pokemonCache.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
