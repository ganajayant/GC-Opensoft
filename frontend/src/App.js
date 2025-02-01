import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GoogleLogin } from './components/GoogleLogin';
import { Homepage } from './components/Homepage';
import { NotFound } from './components/NotFound';

function App() {
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <GoogleLogin></GoogleLogin>
    </GoogleOAuthProvider >
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<GoogleWrapper />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
