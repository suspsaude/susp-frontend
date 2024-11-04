import { useState } from 'react';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchForm from '../Components/SearchForm';
import SearchButton from '../Components/SearchButton';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [specialty, setSpecialty ] = useState<string>('');
  const [specialtyId, setSpecialtyId] = useState<number[] | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [isZipCodeValid, setIsZipCodeValid] = useState<boolean>(false);
  
  const zipCodePattern = /^[0-9]{5}-[0-9]{3}$/;

  const navigate = useNavigate();
  
  const handleSpecialtyChange = (value: string, id: number[] | null) => {
    setSpecialty(value);
    setSpecialtyId(id);
  };

  const handleZipCodeChange = (value: string) => {
    setZipCode(value);
    setIsZipCodeValid(zipCodePattern.test(value));
  };


  const isSearchButtonEnabled = specialty !== '' && isZipCodeValid;

  const handleSearchClick = async() => {
    if (isSearchButtonEnabled) {
      console.log("Testando se o ID chega aqui");
      console.log(specialtyId);
      navigate('/lista', {state: {zipCode, specialtyId}});
    }
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <>
      <ToolBar />
      <Container sx={{ paddingTop: '7rem', textAlign: 'center' }}>
        <Box className="text-center space-y-6 p-6">
          <Typography variant={isSmallScreen ? 'h4':'h3'} sx={{ fontWeight: 'bold', color: '#424242' }}>
            Procure sua Unidade de Saúde
          </Typography>
          <Typography variant="body1" style={{ fontSize: isSmallScreen ? '1rem' : '1.5rem', color: '#424242' }}>
            Digite uma especialidade e o seu CEP para <br/>
            encontrar a unidade do SUS mais próxima.
          </Typography>
          <SearchForm 
            specialty={specialty} 
            zipCode={zipCode} 
            onSpecialtyChange={handleSpecialtyChange} 
            onZipCodeChange={handleZipCodeChange} 
            isZipCodeValid={isZipCodeValid} 
          />
          <SearchButton isSearchButtonEnabled={isSearchButtonEnabled} onClick={handleSearchClick} />
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
