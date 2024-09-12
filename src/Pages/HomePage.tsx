// Pages/HomePage.tsx
import { useState } from 'react';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchForm from '../Components/SearchForm';
import SearchButton from '../Components/SearchButton';

const HomePage: React.FC = () => {
  const [specialty, setSpecialty] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [isZipCodeValid, setIsZipCodeValid] = useState<boolean>(false);
  
  const zipCodePattern = /^[0-9]{5}-[0-9]{3}$/;
  
  const handleSpecialtyChange = (value: string) => {
    setSpecialty(value);
  };

  const handleZipCodeChange = (value: string) => {
    setZipCode(value);
    setIsZipCodeValid(zipCodePattern.test(value));
  };

  const isSearchButtonEnabled = specialty !== '' && isZipCodeValid;

  return (
    <>
      <ToolBar />

      <Container className="mt-12 mx-auto max-w-4xl" style={{paddingTop: '7rem'}}>
        <Box className="text-center space-y-6 p-6">

          <Typography variant="h3" className="title" style={{ fontWeight: 'bold', color: '#424242'}} >
            Procure sua Unidade de Saúde
          </Typography>

          <Typography variant="body1" className="text-gray-600 text-lg sm:text-md" style={{ fontSize: '1.5rem', color : '#424242' }}>
            Digite uma especialidade e o seu endereço para  <br/>
            encontrar a unidade do SUS mais próxima.
          </Typography>


          <SearchForm 
            specialty={specialty} 
            zipCode={zipCode} 
            onSpecialtyChange={handleSpecialtyChange} 
            onZipCodeChange={handleZipCodeChange} 
            isZipCodeValid={isZipCodeValid} 
          />

          <SearchButton isSearchButtonEnabled={isSearchButtonEnabled} />

        </Box>
      </Container>
    </>
  );
};

export default HomePage;
