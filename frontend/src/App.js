import {Route, Routes} from "react-router-dom";

import './css/App.css';

import HomePage from './routes/Home';
import FormPage from "./routes/Form";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/form" element ={<FormPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
