import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Mail, Github, Linkedin, Sparkles} from 'lucide-react';
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 15px rgba(147, 51, 234, 0.2); }
            50% { box-shadow: 0 0 25px rgba(147, 51, 234, 0.4); }
          }
          
          .footer-container {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
          }
          
          .footer-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5), transparent);
          }
          
          .footer-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
            opacity: 0.8;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .social-icon {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }
          
          .social-icon:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            border-color: rgba(147, 51, 234, 0.3);
            animation: pulse-glow 2s infinite;
          }
          
          .floating-element {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #9333ea, #3b82f6);
            border-radius: 50%;
            opacity: 0.4;
            animation: float 4s ease-in-out infinite;
          }
          
          .floating-element:nth-child(1) {
            top: 20px;
            left: 10%;
            animation-delay: 0s;
          }
          
          .floating-element:nth-child(2) {
            top: 30px;
            right: 15%;
            animation-delay: 1.5s;
            width: 4px;
            height: 4px;
          }
          
          .floating-element:nth-child(3) {
            bottom: 20px;
            left: 20%;
            animation-delay: 3s;
            width: 8px;
            height: 8px;
          }
          
          .footer-link {
            position: relative;
            transition: all 0.3s ease;
          }
          
          .footer-link:hover {
            color: #9333ea;
            transform: translateY(-1px);
          }
          
          .footer-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #9333ea, #3b82f6);
            transition: width 0.3s ease;
          }
          
          .footer-link:hover::after {
            width: 100%;
          }
          
          .copyright-text {
            position: relative;
            z-index: 10;
          }
        `
      }} />
      
      <motion.footer 
        className="footer-container py-12 mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Floating Elements */}
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center md:justify-start"
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="w-8 h-8 mr-2 text-purple-400" />
                BlogSphere
              </motion.h3>
              <p className="text-gray-300 leading-relaxed">
                Discover amazing stories, insights, and ideas from writers around the world.
              </p>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-gray-100 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <motion.a 
                  href="/" 
                  className="footer-link block text-gray-300 hover:text-purple-400"
                  whileHover={{ x: 5 }}
                >
                  All Blogs
                </motion.a>
                <motion.a 
                  href="/aboutUs" 
                  className="footer-link block text-gray-300 hover:text-purple-400"
                  whileHover={{ x: 5 }}
                >
                  About Us
                </motion.a>
                <motion.a 
                  href="/contact" 
                  className="footer-link block text-gray-300 hover:text-purple-400"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.a>
                <motion.a 
                  href="/privacy" 
                  className="footer-link block text-gray-300 hover:text-purple-400"
                  whileHover={{ x: 5 }}
                >
                  Privacy Policy
                </motion.a>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="text-center md:text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-xl font-semibold text-gray-100 mb-4">Connect With Us</h4>
              <div className="flex justify-center md:justify-end space-x-4 mb-4">
                <motion.a 
                  href="https://discord.gg/bgbJZvFw" 
                  target='_blank'
                  rel='noopener noreferrer'
                  className="social-icon w-10 h-10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDiscord className="w-5 h-5 text-gray-300" />
                </motion.a>
                <motion.a 
                  href="https://github.com/JxTIN21" 
                  target='_blank'
                  rel='noopener noreferrer'
                  className="social-icon w-10 h-10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 text-gray-300" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/jatin-srivastava-784223253/"
                  target='_blank'
                  rel='noopener noreferrer' 
                  className="social-icon w-10 h-10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-gray-300" />
                </motion.a>
                <motion.a 
                  href="mailto:jatinsrivastava4104@gmail.com" 
                  className="social-icon w-10 h-10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-gray-300" />
                </motion.a>
              </div>
              <p className="text-gray-300 text-sm">
                Follow us for the latest updates and stories
              </p>
            </motion.div>
          </div>
          
          {/* Divider */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
          
          {/* Copyright */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p 
              className="copyright-text text-gray-300 text-sm mb-4 sm:mb-0 flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              © {new Date().getFullYear()} BlogSphere. Made with 
              <motion.span
                className="mx-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.span>
              by passionate developers
            </motion.p>
            
            <motion.div 
              className="flex items-center text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.div>
              <span className="text-sm">Crafted with modern technology</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;