import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar"

import Login from "./Page"
function App() {
  <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route exact path='/create' element={<Create />} />
          <Route exact path='/blogs/:id' element={<BlogDetail />} /> */}
        </Routes>
      </div>
      <ToastContainer />
    </div>
  </Router>
}

export default App;
