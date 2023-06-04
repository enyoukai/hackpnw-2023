import { Route, Routes } from "react-router-dom"

import { Home } from "./pages/Home"
import { PostPage } from "./pages/PostPage"
import { About } from "./pages/About"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"


import { Layout } from "./components/Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>}/>
        <Route path="/posts/:postId" element={<PostPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
