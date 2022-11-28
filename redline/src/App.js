import logo from './logo.svg';
import './App.css';
import Home from './Home';
import AccountPage from './AccountPage';
import LeftDiv from './LeftDiv';





function App() {
  
  return (
    <div id='App' className='d-flex p-3 bg-secondary text-white'>
      <LeftDiv />
      <Home />
      <AccountPage />
    </div>
  );
}

export default App;
