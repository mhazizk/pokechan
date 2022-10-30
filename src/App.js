import { Route, Routes } from 'react-router';
import './components/Styles.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PokemonDetailsPage from './components/PokemonDetails';

const WithNavBar = () => {
  <Navbar>
    <Routes>
      <Route exact path='/pokemon-details' element={<PokemonDetailsPage />} />
      <Route exact path='/about' element={<About />} />
    </Routes>
  </Navbar>
}

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/pokemon-details' element={<PokemonDetailsPage />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
        {/* <Route element={<WithNavBar />} /> */}
      </div>
    </>
  );
}

export default App;
