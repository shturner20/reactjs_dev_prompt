import logo from './logo.svg';
import './App.css';
import GitHubUserSearch from './components/GitHubUserSearchMain'
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container fluid className="App">     
        <header className="App-header">       
          <p>
          GitHub User Search
          </p>
        </header>
        <main>
            <GitHubUserSearch />
        </main>
    </Container>
  );
}

export default App;
