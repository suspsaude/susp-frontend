import './App.css'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const [specialty, setSpecialty] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isZipCodeValid, setIsZipCodeValid] = useState(false);

  // Validar o CEP ( formato simples: 5 digitos + hífen + 3 digitos, ex:, 12345-678)
  const zipCodePattern = /^[0-9]{5}-[0-9]{3}$/;

  // Handle specialty input change
  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  // Handle zip code input change
  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    setIsZipCodeValid(zipCodePattern.test(value)); // Validate zip code format
  };

// Determine if the search button should be enabled
const isSearchButtonEnabled = specialty !== '' && isZipCodeValid;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-blue-600 shadow-lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="text-white">
              SUSP
            </Typography>
            <Button color="inherit" className="text-white hover:bg-blue-500">Início</Button>
            <Button color="inherit" className="text-white hover:bg-blue-500">Contato</Button>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Container className="mt-12 mx-auto max-w-4xl">
        <Box className="text-center space-y-6 p-6">
          <p
            className="title"
          >
            Procure sua Unidade de Saúde
          </p>
          <Typography 
            variant="body1" 
            className="text-gray-600 text-lg sm:text-md"
          >
            Digite a especialidade que você deseja e seu endereço para encontrar a unidade SUS mais próxima.
          </Typography>

          <form className="flex flex-col space-y-4 justify-center md:flex-row md:space-y-0 md:space-x-4">
            <TextField 
              id="specialty-input" 
              label="Especialidade" 
              variant="filled" 
              value={specialty} 
              onChange={handleSpecialtyChange}
              className="lg:w-1/3 md:w-1/2"
            />
            
            <TextField 
              id="zip-code-input" 
              label="CEP (Zip Code)" 
              variant="filled" 
              value={zipCode} 
              onChange={handleZipCodeChange}
              error={!isZipCodeValid && zipCode !== ''}
              helperText={!isZipCodeValid && zipCode !== '' ? 'CEP inválido' : ''}
              className="lg:w-1/3 md:w-1/2"
            />
          </form>

          <Button 
            variant="contained" 
            endIcon={<SearchIcon />} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!isSearchButtonEnabled} // Disable the button if inputs are not valid
          >
            Pesquisar
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;