import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState, AppDispatch } from './redux/store';
import { setPokemon, nextPokemon, prevPokemon } from './redux/pokemonSlice';
import Spinner from './components/Spinner/Spinner';
import ShowPokeDetails from './components/PokemonDetails/ShowPokeDetails';
import { capitalizeFirstLetter } from './utils'; 

const PokemonAxios: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, name } = useSelector((state: RootState) => state.pokemon);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setData(response.data);
        dispatch(setPokemon({ id: response.data.id, name: capitalizeFirstLetter(response.data.name) })); 
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const handlePrev = () => {
    dispatch(prevPokemon());
  };

  const handleNext = () => {
    dispatch(nextPokemon());
  };

  return (
    <div className="pokedex">
      <form>
        {/* Form elements if any */}
      </form>
      {loading && <Spinner />}
      {!loading && data && (
        <ShowPokeDetails
          data={data}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
      {error && <div>Error: {error}</div>}
      <div className="pokemon-info">
        <div>ID: {id}</div>
        <div>Name: {name}</div>
      </div>
    </div>
  );
};

export default PokemonAxios;
