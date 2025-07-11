import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { Singup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { Sendmoney } from './pages/Sendmoney';
function App() {

return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Singup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/send" element={<Sendmoney/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
