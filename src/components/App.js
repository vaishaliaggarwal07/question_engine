import '../components/App.css';
import SignupPage from '../components/SignupPage';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from './Dashboard';

import ForgetpassPage from './ForgetpassPage';
function App() {
  return (
    <Router>
      <Dashboard />
      <Routes>
        <Route  path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetpasswordpage" element={<ForgetpassPage />} />
        {/* <Route path="/dashboard/editcampaign" element={<Editcampaign />} /> */}

       
        {/* <Route
          path="/dashboard/*" // This matches all routes starting with "/dashboard/"
          element={<Dashboard />}
        />
        <Route path="/dashboard/campaigns" element={<Campaign />} />
        <Route path="/dashboard/questionaires" element={<Questionaires />} />
        <Route path="/dashboard/questions" element={<Questions />} />
        <Route path="/dashboard/clients" element={<Clients />} /> */}
        
        </Routes>


      
      
    </Router>
  );
}

export default App;
