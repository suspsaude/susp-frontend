import { useState } from 'react';
import UBSCard from '../Components/UBSCard';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery, Grid2, Pagination, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ListaDeUnidades: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const facilities = [
    { name: 'Unidade Básica de Saúde Vila Gomes', address: 'Rua Corinto, 123, Vila Gomes', type: "Consultório", rating: 4, distance: 3.2, professionals: 15 },
    { name: 'Centro de Saúde São Remo', address: 'Rua Professor Ariovaldo Silveira Franco, 456, São Remo', type: "Policlínica", rating: 3, distance: 5.4, professionals: 10 },
    { name: 'Pronto Socorro Jardim Bonfiglioli', address: 'Avenida Nossa Senhora da Assunção, 789, Jardim Bonfiglioli', type: "Consultório", rating: 5, distance: 1.8, professionals: 25 },
    { name: 'UPA Vila Butantã', address: 'Avenida Corifeu de Azevedo Marques, 234, Vila Butantã', type: "Consultório", rating: 4, distance: 2.3, professionals: 12 },
    { name: 'Posto de Saúde Rio Pequeno', address: 'Rua Domingos Jorge, 567, Rio Pequeno', type:"Consultório", rating: 2, distance: 4.9, professionals: 8 },
    { name: 'Hospital Universitário da USP', address: 'Avenida Prof. Lineu Prestes, 890, Butantã', type: "Policlínica", rating: 5, distance: 2.0, professionals: 30 },
    { name: 'Clínica de Saúde Butantã', address: 'Rua Alvarenga, 1010, Butantã', type: "Centro de Saúde/Unidade Básica", rating: 3, distance: 1.2, professionals: 18 },
    { name: 'UBS Jardim Rolinópolis', address: 'Rua MMDC, 1234, Jardim Rolinópolis', type: "Consultório", rating: 4, distance: 3.5, professionals: 20 },
    { name: 'Centro de Saúde Jardim São Jorge', address: 'Rua Sapetuba, 678, Jardim São Jorge', type: "Centro de Saúde/Unidade Básica", rating: 5, distance: 5.7, professionals: 15 },
    { name: 'Unidade de Saúde Vila Indiana', address: 'Rua Iquiririm, 345, Vila Indiana', type: "Clínica/Centro de especialidade", rating: 3, distance: 2.1, professionals: 10 },
    { name: 'UBS Jardim D’Abril', address: 'Rua José Joaquim Seabra, 789, Jardim D’Abril', type: "Centro de Saúde/Unidade Básica", rating: 2, distance: 4.2, professionals: 6 },
  ];

  const facilitiesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | ''>('');
  const [sortCriteria, setSortCriteria] = useState<string | ''>('distance');

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedType(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortCriteria(event.target.value as string);
  };

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
