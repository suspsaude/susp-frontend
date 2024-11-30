import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link } from 'react-router-dom';

function ToolBar(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar sx={{justifyContent: 'space-between' }}>
                    <Link to='/'><LocalHospitalIcon fontSize="large"/></Link>
                    
                    <Box>
                        <Link to="/"><Button sx={{color:'#f5f5f5'}}>Início</Button></Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ToolBar;