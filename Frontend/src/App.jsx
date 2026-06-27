import { BrowserRouter, Routes, Route } from "react-router";
import "./style.scss";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/Interview.jsx";
import Landing from "./features/interview/pages/Landing.jsx";
import Policy from "./features/interview/pages/Policy.jsx";
import Terms from "./features/interview/pages/Terms.jsx";
import Help from "./features/interview/pages/Help.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/help-center" element={<Help />} />
        <Route path='/home' element={<Protected> <Home /> </Protected>} />
        <Route path='/interview/:interviewId' element={<Protected> <Interview /> </Protected>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;