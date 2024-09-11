import './App.css'
import Button from '@mui/material/Button';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SUSP
            </Typography>
            <Button color="inherit">Início</Button>
            <Button color="inherit">Contato</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container >
        <Box sx = {{ m: 10 }}>
          <h1>
            Procure sua Unidade de Saúde
          </h1>
          <p className="texto-medio mb-5 mt-2">Digite a especialidade que você deseja e seu endereço para encontrar a unidade SUS mais próxima</p>

          <TextField className="mt-4" id="filled-basic" label="Filled" variant="filled" />
          <TextField className="mx-4" id="filled-basic" label="Filled" variant="filled" />

          <Button variant="contained" endIcon={<SearchIcon />}>Pesquisar</Button>
        </Box>

      </Container>
    </>

  );
}

export default App
