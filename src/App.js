import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import Cart from './Pages.jsx/Cart';
import LoginPage from './Pages.jsx/LoginPage';
import OpenRoute from './Auth/OpenRoute';
import SingUpPage from './Pages.jsx/SingUpPage';
import MyProducts from './Pages.jsx/MyProducts';
import { setPosts, setLoading } from './redux/Slices/MyProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const API_URL = "https://fakestoreapi.com/products";
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.myproducts)

  async function fetchData(){
    dispatch(setLoading(true));
    try {
       const output = await fetch(API_URL);
       const data = await output.json();
       dispatch(setPosts(data));
    } catch (error) {
      console.log("Error aagya ji");
      dispatch(setPosts([]));
    }
    dispatch(setLoading(false));
}

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="">
       <Navbar />
       <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/cart" element= {<Cart/>}/>
          <Route path="/cart" element= {<Cart/>}/>
          <Route path="/login" element= {<OpenRoute><LoginPage/></OpenRoute>}/>
          <Route path="/signup" element= {<OpenRoute><SingUpPage/></OpenRoute>}/>
          <Route path="/MyProducts" element= {<MyProducts/>}/>
          <Route path="*" element={<div className='text-center text-[35px] font-bold mt-10'>Path Not Found</div>} />
       </Routes>
    </div>
  );
}

export default App;
