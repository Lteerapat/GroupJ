import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Cards from './components/Cards';

function App() {
  
  return (
    <div id="container">
      <div className="box">
        <a href="#">
          <FontAwesomeIcon icon={faHouse} size="2xl" style={{color: "#ffffff",}} />
        </a>
        <h1>Achievement/Quests</h1>
        <main>
          <Cards/>
        </main>
      </div>
    </div>
  )
}

export default App
