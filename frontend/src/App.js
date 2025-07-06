import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Common/Navbar';
import BlogList from './components/Blog/BlogList';
import BlogDetail from './components/Blog/BlogDetail';
import BlogCreate from './components/Blog/BlogCreate';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Common/ProtectedRoute';
import './App.css';
import Footer from './components/Common/Footer';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

function App() {
  console.log('App component is rendering');
  
  return (
    <AuthProvider>
      <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900'>
        <Navbar/>
        <main className='flex-grow container mx-auto px-4 py-8'>
          <Routes>
            <Route path='/' element={<BlogList/>}/>
            <Route path='/blogs/:id' element={<BlogDetail/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/aboutUs' element={<AboutUs/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/privacy' element={<Privacy/>}/>
            <Route path='/create-blog' element={
              <ProtectedRoute>
                <BlogCreate/>
              </ProtectedRoute>
            }/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </AuthProvider>
  );
}

export default App;