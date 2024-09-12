// Components/SearchButton.tsx
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonProps {
  isSearchButtonEnabled: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isSearchButtonEnabled }) => (
    
  <Button 
    variant="contained" 
    endIcon={<SearchIcon />} 
    className="bg-blue-600 hover:bg-blue-700 text-white"
    disabled={!isSearchButtonEnabled}
  >
    Pesquisar
  </Button>
);

export default SearchButton;
