import { useState, useEffect } from 'react';
import UBSCard from '../Components/UBSCard';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery, Grid2, Pagination, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import { useLocation } from 'react-router-dom';

const ListaDeUnidades: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const facilitiesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | ''>('');
  const [sortCriteria, setSortCriteria] = useState<string | ''>('distance');


  const [facilities, setFacilities] = useState([]);

  const location = useLocation();
  const {zipCode, specialty} = location.state || {};

 

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedType(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortCriteria(event.target.value as string);
  };

  const fetchFacilities = async (cep: string, esp: string) => {
    try {
      
      const response = await fetch (`http://localhost:8000/unidades?cep=${cep}&esp=${esp}`);
      
      if (!response.ok) {
        throw new Error("Erro ao buscar unidades de saúde");
      }

      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("Erro de rede ou falha de conexão: ", error.message);
      } else if (error instanceof SyntaxError) {
        console.log("Erro ao processar dados JSON: ", error.message);
      } else {
        console.log("Erro inesperado: ", error.message);
      }
    }
  };

  useEffect(() => {
    if (zipCode && specialty) {
      fetchFacilities(zipCode, specialty);
    }
  }, [zipCode, specialty]);

  const filteredFacilities = facilities.filter(facility => {
    return (
      (!selectedType || facility.type == selectedType)
    );
  });

  // Sorting Logic
  const sortedFacilities = [...filteredFacilities].sort((a, b) => {
    if (sortCriteria === 'distance') {
      return a.distance - b.distance;
    } else if (sortCriteria === 'professionals') {
      return b.professionals - a.professionals;
    }
    return 0;
  });

  const currentFacilities = sortedFacilities.slice(
    (currentPage - 1) * facilitiesPerPage,
    currentPage * facilitiesPerPage
  );

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
            <Grid2 size = {{xs: 12, sm: 6, md: 6}}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Estabelecimento</InputLabel>
                <Select value={selectedType} onChange={handleTypeChange} label="Tipo de Estabelecimento">
                  <MenuItem value=""><em>Todos</em></MenuItem>
                  <MenuItem value="Consultório">Consultório</MenuItem>
                  <MenuItem value="Clínica/Centro de especialidade">Clínica/Centro de especialidade</MenuItem>
                  <MenuItem value="Centro de Saúde/Unidade Básica">Centro de Saúde/Unidade Básica</MenuItem>
                  <MenuItem value="Policlínica">Policlínica</MenuItem>
                  <MenuItem value="Pronto Socorro">Pronto Socorro</MenuItem>
                </Select>
                
              </FormControl>
            </Grid2>

            <Grid2 size = {{xs: 12, sm: 6, md: 6}}>
              <FormControl fullWidth>
                <InputLabel>Ordenar Por</InputLabel>
                <Select value={sortCriteria} onChange={handleSortChange} label="Ordenar Por">
                  <MenuItem value="distance">Distância</MenuItem>
                  <MenuItem value="professionals">Número de Profissionais</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={3} justifyContent="center" alignItems="center">
            {currentFacilities.length > 0 ? (
              currentFacilities.map((facility, index) => (
                <Grid2 size={12} key={index}>
                  <UBSCard
                    name={facility.name}
                    address={facility.address}
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
              count={Math.ceil(sortedFacilities.length / facilitiesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ListaDeUnidades;
