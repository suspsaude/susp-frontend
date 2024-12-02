import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useEffect, useState } from 'react';

interface Specialty {
    label: string;
    id: number[];
}

interface AutocompleteBarProps {
    onSpecialtyChange: (value: string, id: number[] | null) => void;
}

const AutocompleteBar: React.FC<AutocompleteBarProps> = ({ 
    onSpecialtyChange
}) => {
    const [options, setOptions] = useState<Specialty[]>([]);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await fetch(`/api/especialidades`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Private-Network': 'true',
                        'Access-Control-Allow-Methods': 'GET',
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                const data = await response.json();
                const specialties = data.map((item: {
                    id: number[],
                    name: string
                })  =>({
                    label: item.name,
                    id: item.id
                }));
                console.log(specialties)
                setOptions(specialties);
            } catch (error) {
                console.error("Erro ao buscar especialidades: ", error);
            }
        };
        fetchSpecialties();
    },[]);

    return (
        <Autocomplete
        disablePortal
        onChange={(_, newValue) => {
            onSpecialtyChange(newValue ? newValue.label : "", newValue ? newValue.id : null);
        }}
        options={options}
        renderOption={(props, option) => (
            <li {...props} style={{ textAlign: 'left' }}>
                {option.label}
            </li>
        )}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Especialidade"
                variant="filled"
                fullWidth
            />
        )}
    />
    
    );
}


export default AutocompleteBar;