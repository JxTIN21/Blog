import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, likeBlog, createReview, incrementBlogView } from '../../services/blogService';
import useAuth from '../../hooks/useAuth';
import ReviewCreate from '../Review/ReviewCreate';
import { motion } from 'framer-motion';
import { Heart, Eye, MessageCircle, User, Calendar, Sparkles, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Separate effect to increment view count after blog is loaded
  useEffect(() => {
    const incrementView = async () => {
      if (blog && !viewCounted) {
        try {
          const result = await incrementBlogView(id);
          if (result) {
            // Update the blog state with the new view count
            setBlog(prev => ({
              ...prev,
              views: result.views
            }));
          }
          setViewCounted(true);
        } catch (error) {
          console.error('Failed to increment view:', error);
          // Set viewCounted to true even if it fails to avoid retries
          setViewCounted(true);
        }
      }
    };

    incrementView();
  }, [blog, id, viewCounted]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await likeBlog(id);
      setBlog(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
      setLiked(true);
    } catch (error) {
      console.error('Failed to like blog:', error);
    }
  };

  const handleReviewSubmit = async (content) => {
    try {
      await createReview(id, content);
      // Refresh blog data to show new review
      const updatedBlog = await getBlogById(id);
      setBlog(updatedBlog);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-500 bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-8 text-red-200 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-8 text-gray-200 text-center">
          <h2 className="text-2xl font-bold mb-2">Blog not found</h2>
          <p>The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
          }
          
          .blog-detail-card {
            position: relative;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .blog-detail-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            opacity: 1;
          }
          
          .review-card {
            position: relative;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          }
          
          .review-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(147, 51, 234, 0.15);
            border-color: rgba(147, 51, 234, 0.3);
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
            top: 20px;
            right: 30px;
            animation-delay: 0s;
          }
          
          .floating-element:nth-child(2) {
            top: 50%;
            right: 20px;
            animation-delay: 1s;
            width: 6px;
            height: 6px;
          }
          
          .floating-element:nth-child(3) {
            bottom: 30px;
            left: 30px;
            animation-delay: 2s;
            width: 4px;
            height: 4px;
          }
          
          .like-button {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .like-button:hover:not(:disabled) {
            transform: scale(1.05);
            animation: pulse-glow 2s infinite;
          }
          
          .like-button:disabled {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            color: white;
          }
          
          .back-button {
            position: relative;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }
          
          .back-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(-5px);
          }
        `
      }} />
      
      <div className="max-w-4xl mx-auto p-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="back-button mb-6 px-4 py-2 rounded-lg text-white font-medium flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </motion.button>

        {/* Main Blog Content */}
        <motion.div 
          className="blog-detail-card p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating Elements */}
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          
          <div className="relative z-10">
            {/* Title */}
            <motion.h1 
              className="text-4xl font-bold text-gray-100 mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {blog.title}
            </motion.h1>
            
            {/* Decorative Line */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            
            {/* Author and Date */}
            <motion.div 
              className="flex flex-wrap items-center justify-between mb-8 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="flex items-center mb-2 sm:mb-0"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-5 h-5 mr-2 text-purple-400" />
                <span className="gradient-text font-semibold text-lg">By {blog.author}</span>
              </motion.span>
              
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-gray-300">{new Date(blog.created_at).toLocaleDateString()}</span>
              </motion.span>
            </motion.div>
            
            {/* Content */}
            <motion.div 
              className="prose prose-lg max-w-none mb-8 text-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="whitespace-pre-line text-lg leading-relaxed drop-shadow-sm">
                {blog.content}
              </p>
            </motion.div>
            
            {/* Stats and Actions */}
            <motion.div 
              className="flex flex-wrap justify-between items-center pt-6 border-t border-gray-300 border-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex space-x-6 mb-4 sm:mb-0">
                <motion.button
                  onClick={handleLike}
                  disabled={liked}
                  className={`like-button flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    liked 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'bg-white bg-opacity-20 text-gray-200 hover:bg-opacity-30'
                  }`}
                  whileHover={{ scale: liked ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {blog.likes} Likes
                </motion.button>
                
                <motion.span 
                  className="flex items-center text-gray-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye className="w-5 h-5 mr-2 stat-icon" />
                  <span className="font-medium">{blog.views} Views</span>
                </motion.span>
                
                <motion.span 
                  className="flex items-center text-gray-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageCircle className="w-5 h-5 mr-2 stat-icon" />
                  <span className="font-medium">{blog.reviews.length} Reviews</span>
                </motion.span>
              </div>
              
              {/* Decorative Sparkles */}
              <motion.div
                className="w-8 h-8 opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Review Create Section */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <ReviewCreate onSubmit={handleReviewSubmit} />
          </motion.div>
        )}
        
        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="blog-detail-card p-8"
        >
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl font-bold text-gray-100 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MessageCircle className="w-8 h-8 mr-3 text-purple-400" />
              Reviews ({blog.reviews.length})
            </motion.h2>
            
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            
            {blog.reviews.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-300 text-lg">No reviews yet. Be the first to review!</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {blog.reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    className="review-card p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <User className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="font-semibold text-gray-100 gradient-text">
                          {review.reviewer}
                        </span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4 mr-1 text-blue-400" />
                        <span className="text-sm">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </motion.div>
                    </div>
                    <p className="text-gray-200 leading-relaxed drop-shadow-sm">
                      {review.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogDetail;