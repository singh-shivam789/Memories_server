import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ErrorPage from "./pages/error/ErrorPage";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user, error } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/">
          {user ? <Home /> : <Register/>}
        </Route>
        <Route path="/login"></Route>
        <Route path="/profile/:username"></Route>
        <Route path="/register"></Route>
      </Switch>
    </Router>
  );
}

export default App;
