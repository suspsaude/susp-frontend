import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function ToolBar(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar sx={{justifyContent: 'space-between' }}>
                    <LocalHospitalIcon fontSize="large"/>
                    <Box>
                        <Button sx={{color:'#f5f5f5'}}>Início</Button>
                        <Button sx={{color:'#f5f5f5'}}>Contato</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ToolBar;