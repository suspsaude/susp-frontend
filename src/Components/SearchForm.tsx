import TextField from '@mui/material/TextField';
import AutocompleteBar from './AutocompleteBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchButton from '../Components/SearchButton';

const SearchForm = () => {
  
  // Validation for the zipCode and Specialty inputs
  const zipCodePattern = /^[0-9]{5}-[0-9]{3}$/;
  
  const [zipCode, setZipCode] = useState<string>('');
  const [isZipCodeValid, setIsZipCodeValid] = useState<boolean>(false);
  const handleZipCodeChange = (value: string) => {
    setZipCode(value);
    setIsZipCodeValid(zipCodePattern.test(value));
  };
  
  const [specialty, setSpecialty ] = useState<string>('');
  const [specialtyId, setSpecialtyId] = useState<number[] | null>(null);  
  const handleSpecialtyChange = (value: string, id: number[] | null) => {
    setSpecialty(value);
    setSpecialtyId(id);
  };
  
  const onSpecialtyChange = (value: string, id: number[] | null) => {
    handleSpecialtyChange(value, id);
    setSpecialtyId(id);
  }
  
  const navigate = useNavigate();
    
  const isSearchButtonEnabled = specialty !== '' && isZipCodeValid;
  
  const handleSearchClick = async() => {
    if (isSearchButtonEnabled) {
      navigate('/lista', {state: {zipCode, specialtyId}});
    }
  }

  return (
    <>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto items-start">
      <AutocompleteBar
        onSpecialtyChange={onSpecialtyChange}
       />
      
      <TextField 
        id="zip-code-input" 
        label="CEP" 
        variant="filled" 
        value={zipCode} 
        onChange={(e) => handleZipCodeChange(e.target.value)}
        error={!isZipCodeValid && zipCode !== ''}
        helperText={!isZipCodeValid && zipCode !== '' ? 'CEP inválido' : ''}
        fullWidth      
      />


    </form>
    <SearchButton isSearchButtonEnabled={isSearchButtonEnabled} onClick={handleSearchClick} />
    </>
  );
};

export default SearchForm;