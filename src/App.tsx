import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ListaDeUnidades from './Pages/ListaDeUnidades';
import DetalhesDaUnidade from './Pages/DetalhesDaUnidade';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lista" element={<ListaDeUnidades />} />
        <Route path="/detalhes" element={<DetalhesDaUnidade />} />
      </Routes>
    </Router>
  );
}

export default App;
