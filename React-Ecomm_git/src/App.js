import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import NoPage from "./pages/Nopage";
import "./App.css";
import Login from "./components/Login";
import UserList from "./components/UserList";
import Layout from "./components/Layout";
import { Typography } from "@mui/material";
import Sample from "./components/Sample";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Layout />}>
          <Route path="userlist" element={<UserList />} />
          <Route path="sample" element={<Sample />} />
          <Route path=":id" element={<UpdateUser />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
