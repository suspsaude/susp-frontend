import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function ToolBar(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className="bg-blue-600 shadow-lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <LocalHospitalIcon fontSize="large"/>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" className="text-white hover:bg-blue-500">Início</Button>
                        <Button color="inherit" className="text-white hover:bg-blue-500">Contato</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ToolBar;