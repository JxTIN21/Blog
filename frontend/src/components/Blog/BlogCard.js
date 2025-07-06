import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, User, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const BlogCard = ({ blog }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          .blog-card {
            position: relative;
            height: 100%;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          }
          
          .blog-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(147, 51, 234, 0.2);
            border-color: rgba(147, 51, 234, 0.3);
          }
          
          .blog-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .blog-card:hover::before {
            opacity: 1;
          }
          
          .blog-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.8s ease;
          }
          
          .blog-card:hover::after {
            left: 100%;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .stat-icon {
            transition: all 0.3s ease;
          }
          
          .stat-icon:hover {
            transform: scale(1.2);
            color: #9333ea;
          }
          
          .floating-element {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #9333ea, #3b82f6);
            border-radius: 50%;
            opacity: 0.6;
            animation: float 3s ease-in-out infinite;
          }
          
          .floating-element:nth-child(1) {
            top: 10px;
            right: 10px;
            animation-delay: 0s;
          }
          
          .floating-element:nth-child(2) {
            top: 50%;
            right: 5px;
            animation-delay: 1s;
            width: 6px;
            height: 6px;
          }
          
          .floating-element:nth-child(3) {
            bottom: 10px;
            left: 10px;
            animation-delay: 2s;
            width: 4px;
            height: 4px;
          }
        `
      }} />
      
      <div className="h-full">
        <motion.div
          className="blog-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Floating Elements */}
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          
          {/* Card Content */}
          <div className="p-6 h-full flex flex-col relative z-10">
            {/* Header Section */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className="text-xl font-bold text-gray-100 mb-3 leading-tight drop-shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                {blog.title}
              </motion.h3>
              
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-3"
                whileHover={{ width: "3rem" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Content Preview */}
            <motion.p 
              className="text-gray-200 mb-4 line-clamp-3 flex-grow drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {blog.content.substring(0, 150)}...
            </motion.p>
            
            {/* Author and Date */}
            <motion.div 
              className="flex justify-between items-center text-sm text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-4 h-4 mr-1 text-purple-400" />
                <span className="gradient-text font-medium">{blog.author}</span>
              </motion.span>
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-4 h-4 mr-1 text-blue-400" />
                {new Date(blog.created_at).toLocaleDateString()}
              </motion.span>
            </motion.div>
            
            {/* Stats and Read More Button */}
            <motion.div 
              className="flex justify-between items-center mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Stats */}
              <div className="flex space-x-4">
                <motion.span 
                  className="flex items-center text-gray-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Eye className="w-4 h-4 mr-1 stat-icon" />
                  <span className="text-sm">{blog.views}</span>
                </motion.span>
                
                <motion.span 
                  className="flex items-center text-gray-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Heart className="w-4 h-4 mr-1 stat-icon" />
                  <span className="text-sm">{blog.likes}</span>
                </motion.span>
                
                <motion.span 
                  className="flex items-center text-gray-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <MessageCircle className="w-4 h-4 mr-1 stat-icon" />
                  <span className="text-sm">{blog.review_count}</span>
                </motion.span>
              </div>
              
              {/* Read More Button */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={`/blogs/${blog.id}`} 
                  className="group relative px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="relative z-10 flex items-center">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <motion.div
            className="absolute top-2 right-2 w-6 h-6 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogCard;