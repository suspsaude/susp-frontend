import Button from '@mui/material/Button';

interface SearchButtonProps {
  isSearchButtonEnabled: boolean;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isSearchButtonEnabled, onClick }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={!isSearchButtonEnabled}
        sx={{ width: '200px' }}
      >
        Pesquisar
      </Button>
    </div>
  );
};

export default SearchButton;
