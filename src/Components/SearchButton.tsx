import Button from '@mui/material/Button';

interface SearchButtonProps {
  isSearchButtonEnabled: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isSearchButtonEnabled }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button
        variant="contained"
        color="primary"
        disabled={!isSearchButtonEnabled}
        sx={{ width: '200px' }}
      >
        Pesquisar
      </Button>
    </div>
  );
};

export default SearchButton;
