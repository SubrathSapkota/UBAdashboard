import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import Applications from "./Pages/Applications";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import CreateInterview from "./Pages/CreateInterview";
import Interviewer from "./Pages/Interviewer";
import AddUsers from "./Pages/AddUsers";
import AddInterviewer from "./Pages/AddInterviewer";
import Sidebar from "./components/Sidebar";
// import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/addusers" element={<AddUsers />} />
            <Route path="/interviewer" element={<Interviewer />} />
            <Route path="/interviewer/addinterviewer" element={<AddInterviewer />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/createInterview" element={<CreateInterview />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
