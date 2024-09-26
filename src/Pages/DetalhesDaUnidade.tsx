import ToolBar from '../Components/ToolBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery} from '@mui/material';
import MapComponent from '../Components/MapComponent';

import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import InfoCard from '../Components/InfoCard';

const ListaDeUnidades: React.FC = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <>
        <ToolBar />

        <Container sx={{ paddingTop: '7rem' }}>
            <Box className="space-y-6 p-6" sx={{paddingX: isMediumScreen ? 4 : 40 }}>

                <Typography
                    variant={isSmallScreen ? 'h4' : 'h3'}
                    sx={{ textAlign: 'center', fontWeight: 'bold', color: '#424242' }}
                >
                    Unidade Básica de Saúde da Vila Gomes
                </Typography>
                {/* Contact Info */}
                <InfoCard
                    icon={<PhoneIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Contato"
                    details="+55 (11) 98765-4321"
                />

                {/* Map component */}
                <Box sx={{ marginTop: '2rem' }}>
                    <MapComponent />
                </Box>

                
                {/* Rating */}
                <InfoCard
                    icon={<StarIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="4.6 Estrelas"
                    details="Avaliação do Google"
                />

                {/* Operating Hours */}
                <InfoCard
                    icon={<AccessTimeIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Horário de Funcionamento"
                    details="Seg-Sab: 8:00 - 18:00"
                />

                {/* Staff Info */}
                <InfoCard
                    icon={<PeopleIcon fontSize="large" sx={{ color: '#4285f4' }} />}
                    title="Corpo Médico"
                    details="10 Médicos, 5 Enfermeiros"
                />

            </Box>
        </Container>
        </>
    );
};

export default ListaDeUnidades;
