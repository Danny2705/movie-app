import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Trend from "./components/Trend/Trend";
import Popular from "./components/Popular/Popular";
import Character from "./components/Character/Character";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />

      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/popular' Component={Popular} />
        <Route path='/trend' Component={Trend} />
        <Route path='/character' Component={Character} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
