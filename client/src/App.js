import { Route, Routes } from "react-router-dom"

import { Home } from "./pages/Home"
import { PostPage } from "./pages/PostPage"
import { About } from "./pages/About"
import { SignIn } from "./pages/SignIn"
import { Register } from "./pages/Register"


import { Layout } from "./components/Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>}/>
        <Route path="/posts/:postId" element={<PostPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
