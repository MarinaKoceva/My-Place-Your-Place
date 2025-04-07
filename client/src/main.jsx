import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { UserContext } from './contexts/UserContext';

function AppWrapper() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppWrapper />
  // </StrictMode>
);
