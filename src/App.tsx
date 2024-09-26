import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ListaDeUnidades from './Pages/ListaDeUnidades';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lista" element={<ListaDeUnidades />} />
      </Routes>
    </Router>
  );
}

export default App;
