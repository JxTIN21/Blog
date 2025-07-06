import React from 'react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Lock, Sparkles, Star } from 'lucide-react';

const ReviewCreate = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .review-card {
            position: relative;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .review-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            opacity: 1;
          }
          
          .review-textarea {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            color: white;
          }
          
          .review-textarea:focus {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(147, 51, 234, 0.5);
            animation: glow 2s infinite;
          }
          
          .review-textarea::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .review-textarea:disabled {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.4);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .floating-element {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #9333ea, #3b82f6);
            border-radius: 50%;
            opacity: 0.4;
            animation: float 3s ease-in-out infinite;
          }
          
          .floating-element:nth-child(1) {
            top: 15px;
            right: 20px;
            animation-delay: 0s;
          }
          
          .floating-element:nth-child(2) {
            top: 50%;
            right: 15px;
            animation-delay: 1s;
            width: 6px;
            height: 6px;
          }
          
          .floating-element:nth-child(3) {
            bottom: 20px;
            left: 20px;
            animation-delay: 2s;
            width: 4px;
            height: 4px;
          }
          
          .submit-btn {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            border: none;
            color: white;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(147, 51, 234, 0.4);
          }
          
          .submit-btn:disabled {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.5);
            cursor: not-allowed;
          }
          
          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }
          
          .submit-btn:hover::before {
            left: 100%;
          }
          
          .character-count {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border-radius: 12px;
            padding: 4px 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `
      }} />
      
      <motion.div
        className="review-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating Elements */}
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="relative z-10">
          {/* Header Section */}
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Share Your Thoughts
              </h3>
              <p className="text-gray-300 text-sm">
                {isAuthenticated ? "Your review helps others discover great content" : "Please login to write a review"}
              </p>
            </div>
            
            <motion.div
              className="ml-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-blue-400" />
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Textarea Container */}
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="review-textarea w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder={isAuthenticated ? "Share your thoughts about this blog..." : "Please login to write a review"}
                disabled={!isAuthenticated}
                required={isAuthenticated}
                rows={4}
                maxLength={500}
              />
              
              {/* Character Count */}
              {isAuthenticated && (
                <motion.div
                  className="character-count absolute bottom-4 right-4 text-xs text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: content.length > 0 ? 1 : 0 }}
                >
                  {content.length}/500
                </motion.div>
              )}
            </div>

            {/* Submit Button Section */}
            <div className="flex items-center justify-between">
              {!isAuthenticated && (
                <motion.div
                  className="flex items-center text-gray-400 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Authentication required</span>
                </motion.div>
              )}
              
              {isAuthenticated && (
                <motion.div
                  className="flex items-center text-gray-300 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>Your review will be public</span>
                </motion.div>
              )}

              {isAuthenticated && (
                <motion.button
                  type="submit"
                  className="submit-btn px-8 py-3 rounded-2xl font-semibold flex items-center space-x-2"
                  disabled={!content.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span>Submit Review</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default ReviewCreate;