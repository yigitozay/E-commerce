import Home from "./routes/Home/home.component";

import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./routes/Navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
const App = () => {
  
  return( <Routes>
    <Route path="/" element={<Navigation/>}>
    <Route index element= {<Home/>}/>
    <Route path="auth" element= {<Authentication/>}/> 

    </Route>
    </Routes>)
}

export default App;
