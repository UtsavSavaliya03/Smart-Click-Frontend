import './App.css';
import Header from './Components/Header/index.jsx';
import Sidebar from './Components/Sidebar/index.jsx';
import Main from './Components/Main/index.jsx';
import Footer from './Components/Footer/index.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar>
        <Main />
        <Footer />
      </Sidebar>
    </div>
  );
}

export default App;
