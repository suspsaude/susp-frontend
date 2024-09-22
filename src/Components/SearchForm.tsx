import TextField from '@mui/material/TextField';
import AutocompleteBar from './AutocompleteBar';

interface SearchFormProps {
  specialty: string;
  zipCode: string;
  onSpecialtyChange: (value: string) => void;
  onZipCodeChange: (value: string) => void;
  isZipCodeValid: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  specialty, zipCode, onSpecialtyChange, onZipCodeChange, isZipCodeValid 
}) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto items-start">
      <AutocompleteBar
        specialty={specialty}
        onSpecialtyChange={onSpecialtyChange}
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
