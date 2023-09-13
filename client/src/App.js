import { useState } from 'react';
import ChatDialog from './components/chat/ChatDialog';
import LoginDialog from './components/account/LoginDialog';
import AccountProvider from "./context/AccountProvider";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  if (!isAuthenticated) {
    sessionStorage.clear();
  }
  return (
    isAuthenticated ?
      <>
        <Outlet></Outlet>
      </> : <Navigate replace to="/" />
  )
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginDialog isUserAuthenticated={isUserAuthenticated} />} />
          <Route path="/chat" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/chat" element={<ChatDialog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
