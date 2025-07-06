import React from 'react';
import { useState, useEffect } from "react";
import { getAllBlogs } from '../../services/blogService';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Search, Filter, Grid, List } from 'lucide-react';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getAllBlogs();
                setBlogs(data);
                setFilteredBlogs(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch blogs: ', error);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        let filtered = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort blogs
        filtered = filtered.sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'oldest':
                    return new Date(a.created_at) - new Date(b.created_at);
                case 'most-liked':
                    return b.likes - a.likes;
                case 'most-viewed':
                    return b.views - a.views;
                default:
                    return 0;
            }
        });

        setFilteredBlogs(filtered);
    }, [searchTerm, sortBy, blogs]);

    if (loading) {
        return (
            <>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes shimmer {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        
                        @keyframes pulse {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.5; }
                        }
                        
                        .skeleton {
                            background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
                            background-size: 200% 100%;
                            animation: shimmer 2s infinite;
                        }
                        
                        .loading-spinner {
                            border: 4px solid rgba(147, 51, 234, 0.1);
                            border-top: 4px solid #9333ea;
                            border-radius: 50%;
                            width: 60px;
                            height: 60px;
                            animation: spin 1s linear infinite;
                        }
                        
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `
                }} />
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <motion.div
                        className="loading-spinner mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-100 mb-2">Loading Amazing Blogs...</h2>
                        <p className="text-gray-300">Please wait while we fetch the latest content</p>
                    </motion.div>
                    
                    {/* Skeleton Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
                        {[...Array(6)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="skeleton rounded-xl h-80 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes glow {
                        0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
                        50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
                    }
                    
                    .header-card {
                        position: relative;
                        background: rgba(255, 255, 255, 0.15);
                        backdrop-filter: blur(20px);
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    }
                    
                    .header-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
                        opacity: 1;
                    }
                    
                    .search-input {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        transition: all 0.3s ease;
                    }
                    
                    .search-input:focus {
                        background: rgba(255, 255, 255, 0.2);
                        border-color: rgba(147, 51, 234, 0.5);
                        animation: glow 2s infinite;
                    }
                    
                    .filter-select {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        transition: all 0.3s ease;
                    }
                    
                    .filter-select:focus {
                        background: rgba(255, 255, 255, 0.2);
                        border-color: rgba(147, 51, 234, 0.5);
                    }
                    
                    .gradient-text {
                        background: linear-gradient(135deg, #9333ea, #3b82f6);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        padding-bottom: 8px;
                    }
                    
                    .floating-element {
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        background: linear-gradient(45deg, #9333ea, #3b82f6);
                        border-radius: 50%;
                        opacity: 0.6;
                        animation: float 4s ease-in-out infinite;
                    }
                    
                    .floating-element:nth-child(1) {
                        top: 20px;
                        right: 30px;
                        animation-delay: 0s;
                    }
                    
                    .floating-element:nth-child(2) {
                        top: 50%;
                        right: 20px;
                        animation-delay: 1.5s;
                        width: 8px;
                        height: 8px;
                    }
                    
                    .floating-element:nth-child(3) {
                        bottom: 30px;
                        left: 30px;
                        animation-delay: 3s;
                        width: 6px;
                        height: 6px;
                    }
                    
                    .no-results {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(20px);
                        border-radius: 16px;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }
                `
            }} />
            
            <div className="space-y-8">
                {/* Header Section */}
                <motion.div
                    className="header-card p-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Floating Elements */}
                    <div className="floating-element"></div>
                    <div className="floating-element"></div>
                    <div className="floating-element"></div>
                    
                    <div className="relative z-10">
                        {/* Title Section */}
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center mb-4"
                                whileHover={{ scale: 1.05 }}
                            >
                                <BookOpen className="w-12 h-12 text-purple-400 mr-4" />
                                <h1 className="text-5xl font-bold gradient-text">
                                    Blog Collection
                                </h1>
                                <motion.div
                                    className="ml-4"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="w-8 h-8 text-blue-400" />
                                </motion.div>
                            </motion.div>
                            
                            <motion.div
                                className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4"
                                initial={{ width: 0 }}
                                animate={{ width: "8rem" }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            />
                            
                            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                                Discover amazing stories, insights, and knowledge from our community of writers. 
                                Explore, learn, and get inspired by diverse perspectives and ideas.
                            </p>
                        </motion.div>

                        {/* Search and Filter Section */}
                        <motion.div
                            className="flex flex-col lg:flex-row gap-4 items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Search Input */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search blogs, authors, or topics..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            
                            {/* Sort Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="filter-select pl-10 pr-8 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                                >
                                    <option value="latest" className="bg-gray-800">Latest First</option>
                                    <option value="oldest" className="bg-gray-800">Oldest First</option>
                                    <option value="most-liked" className="bg-gray-800">Most Liked</option>
                                    <option value="most-viewed" className="bg-gray-800">Most Viewed</option>
                                </select>
                            </div>
                        </motion.div>
                        
                        {/* Results Counter */}
                        <motion.div
                            className="text-center mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-gray-300">
                                {filteredBlogs.length === blogs.length 
                                    ? `Showing all ${blogs.length} blogs`
                                    : `Found ${filteredBlogs.length} of ${blogs.length} blogs`
                                }
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                {filteredBlogs.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {filteredBlogs.map((blog, index) => (
                            <motion.div 
                                key={blog.id} 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <BlogCard blog={blog}/>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="no-results p-12 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="w-24 h-24 mx-auto mb-6 text-gray-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <Search className="w-full h-full" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-200 mb-2">No blogs found</h3>
                        <p className="text-gray-400 mb-6">
                            {searchTerm 
                                ? `No blogs match your search for "${searchTerm}"`
                                : "No blogs are available at the moment"
                            }
                        </p>
                        {searchTerm && (
                            <motion.button
                                onClick={() => setSearchTerm('')}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Clear Search
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default BlogList;