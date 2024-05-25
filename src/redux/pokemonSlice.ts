import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  id: number;
  name: string;
}

const initialState: PokemonState = {
  id: 1,
  name: 'Bulbasaur',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon(state, action: PayloadAction<{ id: number; name: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    nextPokemon(state) {
      if (state.id <= 1025) state.id += 1;
    },
    prevPokemon(state) {
      if (state.id > 1) state.id -= 1;
    },
    randomPokemon(state) {
      state.id = Math.floor(Math.random() * 1025) + 1;
    }
  },
});

export const { setPokemon, nextPokemon, prevPokemon, randomPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;