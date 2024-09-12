// Components/SearchForm.tsx
import TextField from '@mui/material/TextField';

interface SearchFormProps {
  specialty: string;
  zipCode: string;
  onSpecialtyChange: (value: string) => void;
  onZipCodeChange: (value: string) => void;
  isZipCodeValid: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ specialty, zipCode, onSpecialtyChange, onZipCodeChange, isZipCodeValid }) => {
  return (
    <form className="flex flex-col space-y-4 justify-center md:flex-row md:space-y-0 md:space-x-4">
      <TextField 
        id="specialty-input" 
        label="Especialidade" 
        variant="filled" 
        value={specialty} 
        onChange={(e) => onSpecialtyChange(e.target.value)}
        className="lg:w-1/3 md:w-1/2"
      />
      
      <TextField 
        id="zip-code-input" 
        label="CEP (Zip Code)" 
        variant="filled" 
        value={zipCode} 
        onChange={(e) => onZipCodeChange(e.target.value)}
        error={!isZipCodeValid && zipCode !== ''}
        helperText={!isZipCodeValid && zipCode !== '' ? 'CEP inválido' : ''}
        className="lg:w-1/3 md:w-1/2"
      />
    </form>
  );
};

export default SearchForm;
