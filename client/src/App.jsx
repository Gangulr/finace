import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";


import Dashboard from "./pages/dashboard";
import Home from "./pages/home";

import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Profile from "./pages/profile";

import Itable from "./pages/income/Itable";
import Iupdate from "./pages/income/IUpdate";
import Iadd from "./pages/income/iadd";


import EUpdate from "./pages/expence/EUpdate";
import Eadd from "./pages/expence/Eadd";
import EEtable from "./pages/expence/EEtable";


import BEtable from "./pages/budeget/BEtable";
import BUpdate from "./pages/budeget/BUpdate";
import Badd from "./pages/budeget/Badd";


import Admins from "./pages/admin";

import Adminview from "./pages/adminview";


import Boat from "./pages/boat";








export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>


      <Route path="/sign" element={<Signin />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/" element={<Home/>} />

      <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
     

   
        <Route path="/dash" element={<Dashboard />} />


        <Route path="/itable" element={<Itable />} />
        <Route path="/iupdate/:incomid" element={<Iupdate />} />
        <Route path="/Iadd" element={<Iadd />} />


        <Route path="/etable" element={<EEtable />} />
        <Route path="/eupdate/:encomid" element={<EUpdate />} />
        <Route path="/eadd" element={<Eadd />} />


        <Route path="/Btable" element={<BEtable />} />
        <Route path="/Bupdate/:Bid" element={<BUpdate />} />
        <Route path="/Badd" element={<Badd />} />

        <Route path="/Boat" element={<Boat/>} />


        <Route path="/adminview" element={<Adminview />} />
        </Route>

        <Route path="/admin" element={<Admins />} />
       
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
