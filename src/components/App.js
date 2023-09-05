import '../components/App.css';
import SignupPage from '../components/SignupPage';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from './Dashboard';
import Campaign from './Campaigns';
import Questionaires from './Questionaires';
import Questions from './Questions';
import Clients from './Clients';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route  path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
       
       

        <Route path="/campaigns" element={<Campaign />} />
        <Route path="/questionaires" element={<Questionaires />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/clients" element={<Clients />} />
        
        </Routes>


      
      
    </Router>
  );
}

export default App;
