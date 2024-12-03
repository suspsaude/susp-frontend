import { useState, useEffect } from 'react';
import UBSCard from '../Components/UBSCard';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery, SelectChangeEvent, Grid2, Pagination, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Facility {
  type: string;
  name: string;
  address: string;
  distance: number;
  cnes: number;
}

const ListaDeUnidades: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const facilitiesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | ''>('');


  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilityTypes, setFacilityType] = useState<string[]>([]);

  const location = useLocation();
  const { zipCode, specialtyId } = location.state || {};

  const navigate = useNavigate();

  const handleDetailsClick = (cnesNumber: number) => {
    navigate('/detalhes/', {state:{cnesNumber}});
  };


  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value as string);
  };

  const fetchFacilities = async (cep: string, specialtyId: number[] | null) => {

    try {
      const servico = specialtyId ? specialtyId[0] : null;
      const classificacao = specialtyId ? specialtyId[1] : null;

      const response = await fetch (`/api/unidades?cep=${cep}&srv=${servico}&clf=${classificacao}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Private-Network': 'true',
            'Access-Control-Allow-Methods': 'GET',
            'Content-Type': 'application/json'
        }
    });
      
      if (!response.ok) {
        throw new Error("Erro ao buscar unidades de saúde");
      }
      
      const data = await response.json();
      setFacilities(data);

      const types:string[] = Array.from(new Set(data.map((facility: Facility) => facility.type)))
      setFacilityType(types);

    } catch (error) {
      if (error instanceof TypeError) {
        console.log("Erro de rede ou falha de conexão: ", error.message);
      } else if (error instanceof SyntaxError) {
        console.log("Erro ao processar dados JSON: ", error.message);
      } else {
        console.log("Erro inesperado!\n", error);
      }
    }
  };

  useEffect(() => {

    if (zipCode && specialtyId) {
      

      fetchFacilities(zipCode, specialtyId);
    }
  }, [zipCode, specialtyId]);

  const filteredFacilities = facilities.filter(facility => {
    return (
      (!selectedType || facility.type == selectedType)
    );
  });

  return (
    <>
      <ToolBar />

      <Container sx={{ paddingTop: '7rem' }}>
        <Box className="space-y-6 p-6" sx={{paddingX: isMediumScreen ? 4 : 20 }}>
          <Typography
            variant={isSmallScreen ? 'h4' : 'h3'}
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#424242' }}
          >
            Escolha uma unidade
          </Typography>

          {/* Filter and Sort Section */}
          <Grid2 container spacing={2} justifyContent="center" mb={4}>
            <Grid2 size = {{xs: 12, sm: 12, md: 12}}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Estabelecimento</InputLabel>
                <Select value={selectedType} onChange={handleTypeChange} label="Tipo de Estabelecimento">
                  <MenuItem value=""><em>Todos</em></MenuItem>
                  {facilityTypes.map((type, index)=>(
                    <MenuItem key={index} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                
              </FormControl>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={3} justifyContent="center" alignItems="center">
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility, index) => (
                <Grid2 size={12} key={index}>
                  <UBSCard
                    name={facility.name}
                    address={facility.address}
                    distance={facility.distance}
                    onDetailsClick={() => handleDetailsClick(facility.cnes)}
                  />
                </Grid2>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Nenhuma unidade encontrada.
              </Typography>
            )}
          </Grid2>

          {/* Pagination Component */}
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredFacilities.length / facilitiesPerPage)}
              page={currentPage}
              onChange={(_, value) => handlePageChange(value)}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ListaDeUnidades;