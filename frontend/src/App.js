
import './App.css';
import Home from './components/Home';
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductDetail from './components/product/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
           <div className='container container-fluid'>
           <ToastContainer theme='dark'/>
           <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
          </Routes>
           </div>
          <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  );


}

export default App;
