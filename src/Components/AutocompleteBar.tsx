import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import top100MedicalSpecialties from './top100MedicalSpecialties';

interface AutocompleteBarProps {
    specialty: string;
    onSpecialtyChange: (value: string) => void;
}

const AutocompleteBar: React.FC<AutocompleteBarProps> = ({ 
    specialty, onSpecialtyChange 
}) => {
    return (
        <Autocomplete
            disablePortal
            
            value={specialty}
            onChange={(event, newValue) => {
                onSpecialtyChange(newValue ? newValue: "");
            }}

            options={top100MedicalSpecialties}
            renderInput={(params) => ( 
                <TextField 
                    {...params} 
                    label="Especialidade"
                    variant='filled'
                    fullWidth
                />
            )}  
        />
    );
}


export default AutocompleteBar;