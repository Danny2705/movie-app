import { BrowserRouter, Routes, Route } from "react-router-dom";
import PopularPage from "./screens/PopularPage/PopularPage";
import TrendPage from "./screens/TrendPage/TrendPage";
import CharacterPage from "./screens/CharacterPage/CharacterPage";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
// import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Layout from "./screens/Layout/Layout";
function App() {
  return (
    <BrowserRouter>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 2000,
          style: {
            border: "1px solid #713200",
            padding: "5px",
            color: "black",
            zIndex: 20000,
            marginTop: "45px",
          },
        }}
      />
      <Routes>
        <Route path='/' Component={Layout} />
        <Route path='/popular' Component={PopularPage} />
        <Route path='/trend' Component={TrendPage} />
        <Route path='/character' Component={CharacterPage} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
