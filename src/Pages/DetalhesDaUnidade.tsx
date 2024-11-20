import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery, Grid2} from '@mui/material';
import MapComponent from '../Components/MapComponent';

import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoCard from '../Components/InfoCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { SERVER_HOST } from '../constants';

interface FacilityDetails {
    cnes: number;
    name: string;
    city: string;
    state: string;
    kind: string;
    cep: string;
    cnpj: string;
    address: string;
    number: string;
    district: string;
    telephone: string;
    latitude: number;
    longitude: number;
    email: string;
    shift: string;
    services: {
        [key: string]: string[]; // Representa os serviços como um objeto onde a chave é uma string e o valor é um array de strings
    };
}

const ListaDeUnidades: React.FC = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const location = useLocation();
    const {cnesNumber} = location.state || {};

    const [facilityDetails, setFacilityDetais] = useState<FacilityDetails>({
        cnes: 0,
        name: '',
        city: '',
        state: '',
        kind: '',
        cep: '',
        cnpj: '',
        address: '',
        number: '',
        district: '',
        telephone: '',
        latitude: 0,
        longitude: 0,
        email: '',
        shift: '',
        services: {},
    });

    const [facilityAddress, setFacilityAddress] = useState<string>('');

    const [facilityContactInfo, setFacitilyContactInfo] = useState<string>('');
    
    const fetchFacitilyDetails = async () => {
        try {
            const response = await fetch(`${SERVER_HOST}/unidades/detalhes?cnes=${cnesNumber}`);

            if (!response.ok) {
                throw new Error("Erro ao buscar unidades de saúde");
            }

            const data = await response.json();
            
            setFacilityDetais(data);
            

        } catch(error) {
            if (error instanceof Error) {
                if (error instanceof TypeError) {
                    console.log("Erro de rede ou falha de conexão: ", error.message);
                } else if (error instanceof SyntaxError) {
                    console.log("Erro ao processar dados JSON: ", error.message);
                } else {
                    console.log("Erro inesperado: ", error.message);
                }
            } else {
                console.log("Erro desconhecido");
            }
        }
    }

    const setFullAddress = async () => {
        const fullAddress = facilityDetails.address + ", " + facilityDetails.number + ", " + facilityDetails.district + ", " + facilityDetails.cep;
        setFacilityAddress(fullAddress);

    }

    const setFullContactInfo = async() => {
        const contactInfo = " Número: " + facilityDetails.telephone + " || Email: " + facilityDetails.email
        setFacitilyContactInfo(contactInfo);
    }

    useEffect(() => {
        fetchFacitilyDetails();
    }, []);

    useEffect(() => {
        if (facilityDetails.address) {
            setFullAddress(); // Atualizar endereço sempre que facilityDetails mudar
        }
    }, [facilityDetails]);

    useEffect(() =>{
        if (facilityDetails.telephone) {
            setFullContactInfo();
        }
    })




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
                    services={facilityDetails.services}        
                />

                {/* Contact Info */}
                <InfoCard
                    icon={<PhoneIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Contato"
                    details={facilityContactInfo}
                    services={facilityDetails.services}
                />

                {/* Operating Hours */}
                <InfoCard
                    icon={<AccessTimeIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Horário de Funcionamento"
                    details={facilityDetails.shift}
                    services={facilityDetails.services}
                />


                <InfoCard
                    icon={<FormatListBulletedIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Lista de Especialidade"
                    details={facilityDetails.name}
                    services={facilityDetails.services}
                />
                </Grid2>
            </Grid2>

            </Box>
        </Container>
        </>
    );
};

export default ListaDeUnidades;
