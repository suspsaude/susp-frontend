import TextField from '@mui/material/TextField';
import AutocompleteBar from './AutocompleteBar';
import { useState } from 'react';

interface SearchFormProps {
  specialty: string;
  zipCode: string;
  onSpecialtyChange: (value: string, id:number[] | null) => void;
  onZipCodeChange: (value: string) => void;
  isZipCodeValid: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  specialty, zipCode, onSpecialtyChange, onZipCodeChange, isZipCodeValid 
}) => {
  const [specialtyId, setSpecialtyId] = useState<number[] | null>(null);
  
  const handleSpecialtyChange = (value: string, id: number[] | null) => {
    onSpecialtyChange(value, id);
    setSpecialtyId(id);
    console.log("ID da especialidade selecionada: ", id);
  }
  
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto items-start">
      <AutocompleteBar
        specialty={specialty}
        onSpecialtyChange={handleSpecialtyChange}
       />
      
      <TextField 
        id="zip-code-input" 
        label="CEP" 
        variant="filled" 
        value={zipCode} 
        onChange={(e) => onZipCodeChange(e.target.value)}
        error={!isZipCodeValid && zipCode !== ''}
        helperText={!isZipCodeValid && zipCode !== '' ? 'CEP inválido' : ''}
        fullWidth      
      />

    </form>
  );
};

export default SearchForm;
