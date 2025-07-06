import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, UserPlus, Mail, Shield, LogIn } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(10deg); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          
          .register-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            position: relative;
            overflow: hidden;
          }
          
          .bg-element-1 {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 24rem;
            height: 24rem;
            background: rgba(147, 51, 234, 0.2);
            border-radius: 50%;
            filter: blur(3rem);
            animation: float 3s ease-in-out infinite;
          }
          
          .bg-element-2 {
            position: absolute;
            bottom: -50%;
            right: -50%;
            width: 24rem;
            height: 24rem;
            background: rgba(59, 130, 246, 0.2);
            border-radius: 50%;
            filter: blur(3rem);
            animation: float 3s ease-in-out infinite 1.5s;
          }
          
          .bg-element-3 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16rem;
            height: 16rem;
            background: rgba(99, 102, 241, 0.1);
            border-radius: 50%;
            filter: blur(2rem);
            animation: float 3s ease-in-out infinite 0.75s;
          }
          
          .floating-icon-1 {
            position: absolute;
            top: 5rem;
            left: 5rem;
            color: rgba(147, 51, 234, 0.3);
            animation: floatIcon 4s ease-in-out infinite;
          }
          
          .floating-icon-2 {
            position: absolute;
            bottom: 5rem;
            right: 5rem;
            color: rgba(59, 130, 246, 0.3);
            animation: floatIcon 3.5s ease-in-out infinite;
          }
          
          .floating-icon-3 {
            position: absolute;
            top: 10rem;
            right: 8rem;
            color: rgba(99, 102, 241, 0.3);
            animation: floatIcon 3.8s ease-in-out infinite 0.5s;
          }
        `
      }} />
      
      <div className="register-container">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-element-1" />
          <div className="bg-element-2" />
          <div className="bg-element-3" />
        </div>

        {/* Floating Icons */}
        <div className="floating-icon-1">
          <Shield size={24} />
        </div>
        <div className="floating-icon-2">
          <Mail size={20} />
        </div>
        <div className="floating-icon-3">
          <User size={22} />
        </div>

        <motion.div
          className="w-full max-w-md mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-50" />
            
            {/* Header */}
            <motion.div
              className="text-center mb-8 relative z-10"
              variants={itemVariants}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <UserPlus className="text-white" size={24} />
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-400 mt-2">Join us and get started</p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center backdrop-blur-sm animate-shake"
              >
                <motion.div
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {error}
                </motion.div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Username Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your username"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your email"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
                    placeholder="Create a password"
                    autoComplete="password"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-200" />
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <UserPlus className="mr-2" size={20} />
                        Create Account
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              className="mt-6 text-center relative z-10"
              variants={itemVariants}
            >
              <p className="text-gray-400">
                Already have an account?{' '}
                <motion.a
                  href="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={16} className="mr-1" />
                  Sign In
                </motion.a>
              </p>
            </motion.div>
          </motion.div>

          {/* Additional Floating Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60 blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 blur-sm"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
              transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
          <motion.div
            className="absolute top-1/2 -left-2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-50 blur-sm"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.7, 0.5],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Register;