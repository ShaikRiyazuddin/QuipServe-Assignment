import './App.css';
import {Home} from "./components/home.jsx";
import {Routes, Route} from "react-router-dom";
import {Update} from "./components/update.jsx";
import {useParams} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/update/:id" element={<Update/>} />
      </Routes>
    </div>
  );
}

export default App;
