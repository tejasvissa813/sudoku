import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/LandingPage/landing';
import Game from './pages/GamePage/game';
import Leaderboard from './pages/LeaderboardPage/leaderboard';

function App() {
  return (
    <div className="App">

      <>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/game" element={<Game />}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
        </Routes>
      </>
    </div>
  );
}

export default App;
