import { useState } from 'react';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchForm from '../Components/SearchForm';
import SearchButton from '../Components/SearchButton';

import {useTheme, useMediaQuery} from '@mui/material';

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <ToolBar />

      <Container sx={{
                        paddingTop: '7rem', 
                        textAlign: 'center'
                    }}>
        <Box className="text-center space-y-6 p-6">

          <Typography 
              variant={isSmallScreen ? 'h4':'h3'} 
              sx={{ fontWeight: 'bold', color: '#424242'}} >
            Procure sua Unidade de Saúde
          </Typography>

          <Typography 
              variant="body1" 
              style={{ 
                fontSize: isSmallScreen ? '1rem' : '1.5rem', 
                color : '#424242' 
                }}
          >
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
