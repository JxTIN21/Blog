import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Target, Heart, BookOpen, Coffee, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const AboutUs = () => {
    const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Jatin Srivastava",
      role: "Founder & Developer",
      description: "Passionate about creating meaningful digital experiences and connecting people through stories.",
      image: "/images/me.jpg"
    },
    {
      name: "Creative Team",
      role: "Content & Design",
      description: "Dedicated to crafting beautiful, engaging content that inspires and informs our community.",
      image: "/images/anu.jpg"
    },
    {
      name: "Community",
      role: "Writers & Contributors",
      description: "Amazing writers from around the world who share their insights and stories with our community.",
      image: "/images/us.jpg"
    }
  ];

  const values = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Knowledge Sharing",
      description: "We believe in the power of shared knowledge and collaborative learning."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description: "Building a supportive community where everyone's voice matters."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Quality Content",
      description: "Committed to providing high-quality, well-researched, and engaging content."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly evolving and embracing new technologies and ideas."
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
          }
          
          .page-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            position: relative;
            overflow-x: hidden;
          }
          
          .page-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
          }
          
          .glass-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.3);
            transform: translateY(-5px);
          }
          
          .hero-section {
            position: relative;
            z-index: 10;
          }
          
          .floating-element {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #9333ea, #3b82f6);
            border-radius: 50%;
            opacity: 0.3;
            animation: float 6s ease-in-out infinite;
          }
          
          .team-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .team-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.3);
            animation: pulse-glow 2s infinite;
          }
          
          .value-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s ease;
          }
          
          .value-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.3);
            transform: translateY(-5px);
          }
        `
      }} />
      
      <div className="page-container">
        {/* Floating Elements */}
        <div className="floating-element" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
        <div className="floating-element" style={{ top: '20%', right: '10%', animationDelay: '2s' }}></div>
        <div className="floating-element" style={{ bottom: '30%', left: '15%', animationDelay: '4s' }}></div>
        <div className="floating-element" style={{ bottom: '15%', right: '8%', animationDelay: '1s' }}></div>
        
        {/* Hero Section */}
        <section className="hero-section py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center justify-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="w-16 h-16 text-purple-400 mr-4" />
                <h1 className="text-6xl font-bold gradient-text">BlogSphere</h1>
              </motion.div>
              
              <motion.p
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome to BlogSphere, where stories come alive and ideas flourish. We're a passionate community 
                dedicated to sharing knowledge, inspiring creativity, and connecting minds from around the globe.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold gradient-text">Our Story</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    BlogSphere was born from a simple yet powerful idea: everyone has a story worth telling. 
                    Founded by passionate developers and writers, we set out to create a platform where 
                    knowledge flows freely and creativity knows no bounds.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    What started as a personal project has evolved into a thriving community of writers, 
                    thinkers, and dreamers who share their insights, experiences, and perspectives with 
                    readers worldwide.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Today, BlogSphere stands as a testament to the power of shared knowledge and the 
                    beauty of human connection through storytelling.
                  </p>
                </div>
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="glass-card p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Coffee className="w-12 h-12 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">Powered by Passion</h3>
                    <p className="text-gray-400">
                      Every line of code, every design decision, and every feature is crafted with 
                      love and dedication to our community.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">Our Values</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                These core principles guide everything we do and shape the BlogSphere experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="value-card text-center"
                >
                  <motion.div
                    className="text-purple-400 mb-4 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">Meet Our Team</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                The passionate individuals behind BlogSphere who work tirelessly to create an amazing experience for our community.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="team-card"
                >
                  <div className="p-6 text-center">
                    <motion.div
                      className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">{member.name}</h3>
                    <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-400">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 text-center"
            >
              <motion.div
                className="inline-flex items-center justify-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-8 h-8 text-red-400 mr-3" />
                <h2 className="text-3xl font-bold gradient-text">Join Our Community</h2>
              </motion.div>
              
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Ready to be part of something amazing? Whether you're a writer, reader, or just someone 
                with a story to tell, we'd love to have you join our growing community.
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                onClick={() => navigate('/create-blog')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Writing
                </motion.button>
                <motion.button
                onClick={() => navigate('/')}
                  className="border border-purple-400 text-purple-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-purple-400 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Blogs
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;