import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../../utils'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Box from '@mui/material/Box';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useDispatch } from 'react-redux';
import { randomPokemon, setPokemon } from '../../redux/pokemonSlice';
import axios from 'axios';

interface ShowPokeDetailsProps {
  data: any;
  onPrev: () => void;
  onNext: () => void;
}

const ShowPokeDetails: React.FC<ShowPokeDetailsProps> = ({ data, onPrev, onNext }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRandom = () => {
    dispatch(randomPokemon());
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const id = parseInt(searchTerm, 10);
    if (!isNaN(id) && id > 0 && id <= 1025) {
      dispatch(setPokemon({ id, name: '' })); // Name will be fetched and updated later
    } else {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        dispatch(setPokemon({ id: response.data.id, name: capitalizeFirstLetter(response.data.name) }));
      } catch (error) {
        alert('Pokemon not found. Please enter a valid Pokemon ID (1-1025) or name.');
      }
    }
  };

  return (
    <div className="pokemon-details">
      <div className="screen">
        <div className="pokemon-images">
          <img src={data.sprites.front_default} alt={data.name} />
          <img src={data.sprites.front_shiny} alt={`${data.name} shiny`} />
        </div>
      </div>
      <div className="pokemon-info">
        <div>ID: {data.id}</div>
        <div>Name: {capitalizeFirstLetter(data.name)}</div>
      </div>
      <div className="search-bar">
        <TextField
          variant="outlined"
          placeholder="Name or ID"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          InputProps={{
            style: {
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)',
            },
          }}
          sx={{ width: '80%' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </div>
      <div className="nav-buttons">
        <Box boxShadow={3} m={1}>
            <Button variant="contained" color="primary" onClick={onPrev}><WestIcon/></Button>
        </Box>
        <Box boxShadow={3} m={1}>
          <Button variant="contained" color="secondary" onClick={handleRandom}><ShuffleIcon/></Button>
        </Box>
        <Box boxShadow={3} m={1}>
            <Button variant="contained" color="primary" onClick={onNext}><EastIcon/></Button>
        </Box>
      </div>
    </div>
  );
};

export default ShowPokeDetails;
