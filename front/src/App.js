import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import UserContextProvider, { UserContext } from "./UserContextProvider";
import {GlobalProvider } from "./Search";
import Log from "./pages/Log";
import { useContext } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfilePhoto from "./pages/ProfileForm";
import ArtBoard from "./pages/ArtBoard";
import Art from "./pages/Art";
import UserPage from "./pages/UserPage";
import Search from "./pages/Search";

axios.defaults.baseURL="http://localhost:8000"
axios.defaults.withCredentials=true

function App() {
  const {user}=useContext(UserContext)
  return (
    <UserContextProvider>
      <GlobalProvider>
    <Router>
      <Routes>
        <Route path={user?"/home":"/"} element={<Layout />}>
          <Route index element={<Log />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/home/art/:title/:id" element={<Art/>} />
          <Route path="/search/art/:title/:id" element={<Art/>} />
          <Route path="/home/art/:id/:title/:id" element={<Art/>} />
          <Route path="/profile/:username/:id" element={<UserPage/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/profile/:id/newArtBoard" element={<ArtBoard/>} />
          <Route path="/profile/:id/editArt/:id" element={<ArtBoard/>} />
          <Route path="/profile/editprofile" element={<ProfilePhoto/>} />
          <Route path="/profile/editprofile/:id" element={<ProfilePhoto/>} />
          <Route path="/search" element={<Search/>} />
        </Route>
      </Routes>
    </Router>
      </GlobalProvider>
    </UserContextProvider>
  );
}

export default App;
