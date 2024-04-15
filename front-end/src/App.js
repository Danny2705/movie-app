import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LibraryPage from "./screens/LibraryPage/LibraryPage";
import TrendPage from "./screens/TrendPage/TrendPage";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import { Toaster } from "react-hot-toast";
import Layout from "./screens/Layout/Layout";
import MovieInfo from "./screens/MovieInfo/MovieInfo";
import CharacterPage from "./screens/CharacterPage/CharacterPage";
import SearchPage from "./screens/SearchPage/SearchPage";

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
        <Route path='/' element={<Layout />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/library' element={<Navigate to='/library/ShowAll' />} />
        <Route path='/library/:letter' element={<LibraryPage />} />
        <Route path='/library/title/:title/:id' element={<MovieInfo />} />
        <Route path='/trend' element={<TrendPage />} />
        <Route path='/character' element={<CharacterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
