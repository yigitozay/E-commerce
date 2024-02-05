import Home from "./routes/Home/home.component";

import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./routes/Navigation/navigation.component";
import SignIn from "./routes/Signin/sign-in.component";
const App = () => {
  
  return( <Routes>
    <Route path="/" element={<Navigation/>}>
    <Route index element= {<Home/>}/>
    <Route path="signIn" element= {<SignIn/>}/> 

    </Route>
    </Routes>)
}

export default App;
