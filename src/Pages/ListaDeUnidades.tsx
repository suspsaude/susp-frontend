import { useState } from 'react';
import FacilityCard from '../Components/UBSCard';
import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTheme, useMediaQuery, Grid2, Pagination} from '@mui/material';

const ListaDeUnidades: React.FC = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const facilities = [
    { name: 'Unidade Básica de Saúde Vila Gomes', address: 'Rua Corinto, 123, Vila Gomes' },
    { name: 'Centro de Saúde São Remo', address: 'Rua Professor Ariovaldo Silveira Franco, 456, São Remo' },
    { name: 'Pronto Socorro Jardim Bonfiglioli', address: 'Avenida Nossa Senhora da Assunção, 789, Jardim Bonfiglioli' },
    { name: 'UPA Vila Butantã', address: 'Avenida Corifeu de Azevedo Marques, 234, Vila Butantã' },
    { name: 'Posto de Saúde Rio Pequeno', address: 'Rua Domingos Jorge, 567, Rio Pequeno' },
    { name: 'Hospital Universitário da USP', address: 'Avenida Prof. Lineu Prestes, 890, Butantã' },
    { name: 'Clínica de Saúde Butantã', address: 'Rua Alvarenga, 1010, Butantã' },
    { name: 'UBS Jardim Rolinópolis', address: 'Rua MMDC, 1234, Jardim Rolinópolis' },
    { name: 'Centro de Saúde Jardim São Jorge', address: 'Rua Sapetuba, 678, Jardim São Jorge' },
    { name: 'Unidade de Saúde Vila Indiana', address: 'Rua Iquiririm, 345, Vila Indiana' },
    { name: 'UBS Jardim D’Abril', address: 'Rua José Joaquim Seabra, 789, Jardim D’Abril' },
  ];
  
  
  const facilitiesPerPage = 5; // Number of facilities per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(facilities.length / facilitiesPerPage);

  const currentFacilities = facilities.slice(
    (currentPage - 1) * facilitiesPerPage,
    currentPage * facilitiesPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };


  return (
    <>
      <ToolBar />

      <Container sx={{paddingTop: '7rem'}}>
        <Box className="space-y-6 p-6">
          <Typography
              variant={isSmallScreen ? 'h4':'h3'} 
              sx={{ textAlign:"center", fontWeight: 'bold', color: '#424242'}} >
            Escolha uma unidade
          </Typography>

          <Grid2 container spacing={2} justifyContent="center" alignItems="center">
            {currentFacilities.map((facility, index) => (
              <Grid2 size={10} key={index}>
                <FacilityCard
                  name={facility.name}
                  address={facility.address}
                />
              </Grid2>
            ))}
          </Grid2>

          {/* Pagination Component */}
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
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
