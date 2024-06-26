import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LibraryPage from "./screens/LibraryPage/LibraryPage";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import { Toaster } from "react-hot-toast";
import Layout from "./screens/Layout/Layout";
import MovieInfo from "./screens/MovieInfo/MovieInfo";
import SearchPage from "./screens/SearchPage/SearchPage";
import NoMatch from "./screens/NoMatch/NoMatch";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import SchedulePage from "./screens/SchedulePage/SchedulePage";
import UpcomingPage from "./screens/UpcomingPage/UpcomingPage";
import WatchList from "./screens/WatchList/WatchList";
import WatchPage from "./screens/Watch/WatchPage";

function App() {
  const user = useSelector((state) => state.auth.user);
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
        <Route path='/watch/:id' element={<WatchPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/library' element={<Navigate to='/library/ShowAll' />} />
        <Route path='/library/:letter' element={<LibraryPage />} />
        <Route path='/library/title/:title/:id' element={<MovieInfo />} />
        <Route path='/upcoming' element={<UpcomingPage />} />
        <Route path='/watchlist' element={<WatchList />} />
        <Route path='/schedule' element={<SchedulePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {user ? (
          <Route path='/profile/user/:userId' element={<ProfilePage />} />
        ) : (
          <Route path='*' element={<NoMatch />} />
        )}
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
