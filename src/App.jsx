import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Services from './Pages/Services';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RoleSelection from './Pages/RoleSelection';
import ContractorForm from './Pages/ContractorForm';
import ContractorDetails from './Pages/ContractorDetails';
import Contact from './Pages/Contact';
import UserLogin from './Pages/UserLogin';
import UserrDashboard from './Pages/UserrDashboard';
import CompletedWorks from './Pages/CompletedWorks';
import RequestWork from './Pages/RequestWork';
import Reviews from './Pages/Reviews';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDshboard';




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/contractor-form" element={<ContractorForm />} />
        <Route path="/contractor-details/:id" element={<ContractorDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserrDashboard />} />
        <Route path="/completed-works" element={<CompletedWorks />} />
        <Route path="/request-work" element={<RequestWork />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />




      </Routes>
      <Footer />
    </>
  );
}

export default App;
