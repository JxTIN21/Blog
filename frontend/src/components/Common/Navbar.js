import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Globe, PlusCircle, LogOut, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          .navbar-container {
            position: relative;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
          }
          
          .navbar-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            opacity: 0.8;
          }
          
          .navbar-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5), transparent);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            padding: 4px;
          }
          
          .nav-button {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            overflow: hidden;
          }
          
          .nav-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }
          
          .nav-button:hover::before {
            left: 100%;
          }
          
          .nav-button:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(147, 51, 234, 0.3);
            transform: translateY(-1px);
          }
          
          .primary-button {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            border: none;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .primary-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #a855f7, #60a5fa);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .primary-button:hover::before {
            opacity: 1;
          }
          
          .primary-button:hover {
            transform: translateY(-2px);
            animation: pulse-glow 2s infinite;
          }
          
          .secondary-button {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }
          
          .secondary-button:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(147, 51, 234, 0.4);
            transform: translateY(-1px);
          }
          
          .user-welcome {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }
          
          .user-welcome:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: scale(1.02);
          }
          
          .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            border-left: 1px solid rgba(255, 255, 255, 0.2);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .floating-element {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #9333ea, #3b82f6);
            border-radius: 50%;
            opacity: 0.6;
            animation: float 3s ease-in-out infinite;
          }
          
          .floating-element:nth-child(1) {
            top: 10px;
            left: 20%;
            animation-delay: 0s;
          }
          
          .floating-element:nth-child(2) {
            top: 15px;
            right: 30%;
            animation-delay: 1s;
            width: 3px;
            height: 3px;
          }
          
          .floating-element:nth-child(3) {
            bottom: 10px;
            left: 60%;
            animation-delay: 2s;
            width: 5px;
            height: 5px;
          }
          
          .logo-glow {
            filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.3));
          }
          
          @media (max-width: 768px) {
            .navbar-container {
              padding: 0.75rem 1rem;
            }
          }
        `
      }} />
      
      <motion.nav 
        className="navbar-container shadow-xl sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Floating Elements */}
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-3xl font-bold gradient-text logo-glow"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-8 h-8 text-purple-400" />
              </motion.div>
              <span>BlogSphere</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {isAuthenticated ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/create-blog" 
                    className="primary-button px-5 py-2.5 text-white rounded-xl font-medium flex items-center space-x-2 relative z-10"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Blog</span>
                  </Link>
                </motion.div>
                
                <motion.div
                  className="user-welcome px-4 py-2.5 rounded-xl text-gray-100 font-medium flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span>Welcome, <span className="gradient-text font-semibold">{user?.username || user?.name || 'User'}</span></span>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    onClick={handleLogout}
                    className="secondary-button px-5 py-2.5 text-gray-100 rounded-xl font-medium flex items-center space-x-2 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/login" 
                    className="nav-button px-5 py-2.5 text-gray-100 rounded-xl font-medium hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/register" 
                    className="primary-button px-5 py-2.5 text-white rounded-xl font-medium relative z-10"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden nav-button p-2 rounded-xl text-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      to="/create-blog" 
                      className="primary-button w-full px-4 py-3 text-white rounded-xl font-medium flex items-center justify-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Create Blog</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    className="user-welcome w-full px-4 py-3 rounded-xl text-gray-100 font-medium flex items-center justify-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <User className="w-4 h-4 text-purple-400" />
                    <span>Welcome, <span className="gradient-text font-semibold">{user?.username || user?.name || 'User'}</span></span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button 
                      onClick={handleLogout}
                      className="secondary-button w-full px-4 py-3 text-gray-100 rounded-xl font-medium flex items-center justify-center space-x-2 hover:text-white"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      to="/login" 
                      className="nav-button w-full px-4 py-3 text-gray-100 rounded-xl font-medium text-center block hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      to="/register" 
                      className="primary-button w-full px-4 py-3 text-white rounded-xl font-medium text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;