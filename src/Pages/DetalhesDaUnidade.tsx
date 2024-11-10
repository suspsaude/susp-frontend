import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery, Grid2} from '@mui/material';
import MapComponent from '../Components/MapComponent';

import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import InfoCard from '../Components/InfoCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const ListaDeUnidades: React.FC = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const location = useLocation();
    const {cnesNumber} = location.state || {};

    const [facilityDetails, setFacilityDetais] =  useState<{ name: string }>({ name: '' });

    const [facilityAddress, setFacilityAddress] = useState<string>('');
    
    const fetchFacitilyDetails = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/unidades/detalhes?cnes=${cnesNumber}`);

            if (!response.ok) {
                throw new Error("Erro ao buscar unidades de saúde");
            }

            const data = await response.json();

            console.log(data.cnes)
            console.log(data.services)
            
            setFacilityDetais(data);
            callSetFacilityAddress();

        } catch(error) {
            if (error instanceof TypeError) {
                console.log("Erro de rede ou falha de conexão: ", error.message);
              } else if (error instanceof SyntaxError) {
                console.log("Erro ao processar dados JSON: ", error.message);
              } else {
                console.log("Erro inesperado: ", error.message);
              }
        }
    }

    const callSetFacilityAddress = async () => {
        const fullAddress = facilityDetails.address + ", " + facilityDetails.number + ", " + facilityDetails.district + ", " + facilityDetails.cep;
        setFacilityAddress(fullAddress);

    }

    useEffect(() => {
        fetchFacitilyDetails();
    }, []);


    return (
        <>
        <ToolBar />
        
        <Container sx={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
            <Box className="space-y-6" sx={{paddingX: isMediumScreen ? 4 : 15 }}>
                <Typography
                    variant={isSmallScreen ? 'h4' : 'h3'}
                    sx={{ textAlign: 'center', fontWeight: 'bold', color: '#424242' }}
                >
                    {facilityDetails.name}
                </Typography>

            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 size = {{xs: 12, sm: 4, md: 6}}>
                    {/* Map component */}
                    <Box sx={{ marginTop: '1rem' }}>
                        {facilityDetails.latitude && facilityDetails.longitude ? (
                            <MapComponent 
                                latitude={facilityDetails.latitude}
                                longitude={facilityDetails.longitude}
                            />
                            ) : (
                            <Typography>Loading map...</Typography>
                        )}
                    </Box>
                </Grid2>

                <Grid2 size = {{xs: 12, sm: 6, md: 6}}>

                {/* Address Info */}
                <InfoCard
                    icon={<LocalHospitalIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Endereço"
                    details={facilityAddress}
                />

                {/* Contact Info */}
                <InfoCard
                    icon={<PhoneIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Contato"
                    details={facilityDetails.telephone}
                />

                {/* Operating Hours */}
                <InfoCard
                    icon={<AccessTimeIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Horário de Funcionamento"
                    details={facilityDetails.shift}
                />

 

                {/* <p>{facilityDetails.services}</p> */}

                </Grid2>
            </Grid2>

            </Box>
        </Container>
        </>
    );
};

export default ListaDeUnidades;
