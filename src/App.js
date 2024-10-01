import './App.css';
import FrontPage from './pages/FrontPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import CreateUserPage from './pages/CreateUserPage';
import AdminPage from './pages/AdminPage';
import MyPage from './pages/MyPage';
import ProtectedRouteUser from './ProtectedRouteUser';
import Biography from './pages/Biography';
import ChildrenBook from './pages/ChildrenBook';
import Crime from './pages/Crime';
import Fantasy from "./pages/Fantasy";
import HealthAndLifestyle from "./pages/HealthAndLifestyle";
import NonFiction from './pages/NonFiction';
import Novel from "./pages/Novel";
import Roman from "./pages/Roman";
import SearchPage from './pages/SearchPage';
import BookPage from './pages/BookPage';

function App() {
  
  return (
    
    <><><Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path= "/createuserpage" element={<CreateUserPage />} />
        <Route path= "/adminpage" element={<AdminPage/>} />
        <Route path= "/mypage" element={<ProtectedRouteUser><MyPage/></ProtectedRouteUser>} />
        <Route path="/Biography" element={<Biography />} />
        <Route path="/Crime" element={<Crime />} />
        <Route path="/Roman" element={<Roman />} />
        <Route path="/NonFiction" element={<NonFiction />} />
        <Route path="/Novel" element={<Novel />} />
        <Route path="/HealthAndLifestyle" element={<HealthAndLifestyle />} />
        <Route path="/Fantasy" element={<Fantasy />} />
        <Route path="/ChildrenBook" element={<ChildrenBook />} />
        <Route path= "/search/:genre/:handle" element={<SearchPage />} />
        <Route path= "/books/:handle" element={<BookPage />} />
      </Routes>
    </Router><></></></>
  );
}

export default App;
