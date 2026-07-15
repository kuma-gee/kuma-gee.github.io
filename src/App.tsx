import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Blog from "./Blog";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
