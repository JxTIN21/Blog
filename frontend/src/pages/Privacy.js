import React, { useState } from 'react';
import { Shield, Eye, Lock, Users, Globe, FileText, AlertCircle, CheckCircle, Mail, Calendar } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: <Eye className="w-5 h-5" /> },
    { id: 'collection', title: 'Data Collection', icon: <FileText className="w-5 h-5" /> },
    { id: 'usage', title: 'How We Use Data', icon: <Users className="w-5 h-5" /> },
    { id: 'sharing', title: 'Data Sharing', icon: <Globe className="w-5 h-5" /> },
    { id: 'security', title: 'Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'rights', title: 'Your Rights', icon: <Shield className="w-5 h-5" /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail className="w-5 h-5" /> }
  ];

  const lastUpdated = "December 15, 2024";

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 15px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: 0 0 25px rgba(147, 51, 234, 0.5); }
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
            background: radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
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
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(147, 51, 234, 0.3);
          }
          
          .nav-item {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .nav-item:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.3);
            transform: translateX(5px);
          }
          
          .nav-item.active {
            background: rgba(147, 51, 234, 0.2);
            border-color: rgba(147, 51, 234, 0.5);
            color: #a855f7;
          }
          
          .content-section {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 1.5rem;
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
          
          .highlight-box {
            background: rgba(147, 51, 234, 0.1);
            border: 1px solid rgba(147, 51, 234, 0.3);
            border-radius: 12px;
            padding: 1rem;
            margin: 1rem 0;
          }
          
          .warning-box {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 12px;
            padding: 1rem;
            margin: 1rem 0;
          }
          
          .success-box {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 12px;
            padding: 1rem;
            margin: 1rem 0;
          }
          
          .security-box {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 1rem;
            margin: 1rem 0;
          }
          
          .policy-list {
            list-style: none;
            padding: 0;
          }
          
          .policy-list li {
            position: relative;
            padding-left: 2rem;
            margin-bottom: 1rem;
            color: #d1d5db;
          }
          
          .policy-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #9333ea;
            font-size: 1.5rem;
            line-height: 1;
          }
          
          .section-title {
            color: #f3f4f6;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .sticky-nav {
            position: sticky;
            top: 2rem;
            height: fit-content;
          }
          
          .contact-button {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            border: none;
            border-radius: 12px;
            padding: 1rem 2rem;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .contact-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(147, 51, 234, 0.4);
          }
        `
      }} />
      
      <div className="page-container">
        {/* Floating Elements */}
        <div className="floating-element" style={{ top: '12%', left: '6%', animationDelay: '0s' }}></div>
        <div className="floating-element" style={{ top: '20%', right: '8%', animationDelay: '2s' }}></div>
        <div className="floating-element" style={{ bottom: '25%', left: '12%', animationDelay: '4s' }}></div>
        <div className="floating-element" style={{ bottom: '15%', right: '15%', animationDelay: '1s' }}></div>
        
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <Shield className="w-12 h-12 text-purple-400 mr-4" />
                <h1 className="text-5xl font-bold gradient-text">Privacy Policy</h1>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use BlogSphere.
              </p>
              
              <div className="flex items-center justify-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Navigation */}
              <div className="sticky-nav">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Navigation</h3>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.icon}
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                {/* Overview */}
                {activeSection === 'overview' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <Eye className="w-6 h-6 text-purple-400" />
                        Privacy Policy Overview
                      </h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        At BlogSphere, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect your data when you use our platform.
                      </p>
                      
                      <div className="highlight-box">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">Our Commitment</h4>
                            <p className="text-gray-300">
                              We believe in transparency and will never sell, rent, or trade your personal information to third parties for marketing purposes.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">What This Policy Covers</h3>
                      <ul className="policy-list">
                        <li>Information we collect and how we collect it</li>
                        <li>How we use your information</li>
                        <li>When and how we share information</li>
                        <li>How we protect your information</li>
                        <li>Your rights and choices</li>
                        <li>How to contact us about privacy concerns</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Data Collection */}
                {activeSection === 'collection' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <FileText className="w-6 h-6 text-purple-400" />
                        Information We Collect
                      </h2>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Information You Provide</h3>
                      <ul className="policy-list">
                        <li><strong>Account Information:</strong> Name, email address, username, and password</li>
                        <li><strong>Profile Information:</strong> Bio, profile picture, and social media links</li>
                        <li><strong>Content:</strong> Blog posts, comments, and other content you create</li>
                        <li><strong>Communications:</strong> Messages sent through our contact forms or support channels</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Information We Collect Automatically</h3>
                      <ul className="policy-list">
                        <li><strong>Usage Data:</strong> Pages visited, time spent on site, and interaction patterns</li>
                        <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
                        <li><strong>Location Data:</strong> General location based on IP address (not precise location)</li>
                        <li><strong>Cookies:</strong> Small files stored on your device to improve your experience</li>
                      </ul>
                      
                      <div className="warning-box">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">Note About Cookies</h4>
                            <p className="text-gray-300">
                              We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but this may affect some site functionality.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Usage */}
                {activeSection === 'usage' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <Users className="w-6 h-6 text-purple-400" />
                        How We Use Your Information
                      </h2>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We use the information we collect to provide, maintain, and improve our services. Here's how:
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Service Provision</h3>
                      <ul className="policy-list">
                        <li>Create and manage your account</li>
                        <li>Display your content and profile to other users</li>
                        <li>Enable communication features</li>
                        <li>Provide customer support</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Platform Improvement</h3>
                      <ul className="policy-list">
                        <li>Analyze usage patterns to improve our platform</li>
                        <li>Develop new features and services</li>
                        <li>Personalize your experience</li>
                        <li>Conduct research and analytics</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Communication</h3>
                      <ul className="policy-list">
                        <li>Send important account notifications</li>
                        <li>Respond to your inquiries and support requests</li>
                        <li>Send newsletters and updates (with your consent)</li>
                        <li>Notify you of new features or changes</li>
                      </ul>
                      
                      <div className="success-box">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">Your Control</h4>
                            <p className="text-gray-300">
                              You can opt out of non-essential communications at any time through your account settings or by contacting us directly.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Sharing */}
                {activeSection === 'sharing' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <Globe className="w-6 h-6 text-purple-400" />
                        How We Share Information
                      </h2>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We do not sell, rent, or trade your personal information. We may share information in the following limited circumstances:
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">With Your Consent</h3>
                      <ul className="policy-list">
                        <li>When you explicitly agree to share information</li>
                        <li>When you make your profile or content public</li>
                        <li>When you connect with third-party services</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Service Providers</h3>
                      <ul className="policy-list">
                        <li>Cloud hosting and storage providers</li>
                        <li>Email service providers</li>
                        <li>Analytics and monitoring services</li>
                        <li>Payment processors (if applicable)</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Legal Requirements</h3>
                      <ul className="policy-list">
                        <li>To comply with applicable laws and regulations</li>
                        <li>To respond to valid legal requests</li>
                        <li>To protect our rights and the safety of our users</li>
                        <li>To prevent fraud and abuse</li>
                      </ul>
                      
                      <div className="warning-box">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">Third-Party Services</h4>
                            <p className="text-gray-300">
                              All third-party service providers are contractually bound to protect your information and use it only for the purposes we specify.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security */}
                {activeSection === 'security' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <Lock className="w-6 h-6 text-purple-400" />
                        Security Measures
                      </h2>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Technical Safeguards</h3>
                      <ul className="policy-list">
                        <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                        <li><strong>Secure Servers:</strong> Our servers are hosted in secure, certified data centers</li>
                        <li><strong>Regular Updates:</strong> We keep all systems updated with the latest security patches</li>
                        <li><strong>Access Controls:</strong> Strict access controls limit who can view your information</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Administrative Safeguards</h3>
                      <ul className="policy-list">
                        <li>Background checks for employees with data access</li>
                        <li>Regular security training for all staff</li>
                        <li>Incident response procedures</li>
                        <li>Regular security audits and assessments</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Your Role in Security</h3>
                      <ul className="policy-list">
                        <li>Use strong, unique passwords</li>
                        <li>Enable two-factor authentication</li>
                        <li>Keep your account information up to date</li>
                        <li>Report suspicious activity immediately</li>
                      </ul>
                      
                      <div className="security-box">
                        <div className="flex items-start">
                          <Lock className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">Data Breach Protocol</h4>
                            <p className="text-gray-300">
                              In the unlikely event of a data breach, we will notify affected users within 72 hours and provide clear information about what happened and what we're doing to resolve it.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Rights */}
                {activeSection === 'rights' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <Shield className="w-6 h-6 text-purple-400" />
                        Your Rights and Choices
                      </h2>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        You have several rights regarding your personal information. Here's what you can do:
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Access and Portability</h3>
                      <ul className="policy-list">
                        <li><strong>Access:</strong> Request a copy of all personal information we hold about you</li>
                        <li><strong>Portability:</strong> Export your data in a common, machine-readable format</li>
                        <li><strong>Transparency:</strong> Understand how your data is being used</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Correction and Deletion</h3>
                      <ul className="policy-list">
                        <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                        <li><strong>Account Closure:</strong> Close your account and delete associated data</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Control and Consent</h3>
                      <ul className="policy-list">
                        <li><strong>Consent Withdrawal:</strong> Withdraw consent for data processing</li>
                        <li><strong>Marketing Opt-out:</strong> Unsubscribe from marketing communications</li>
                        <li><strong>Profile Visibility:</strong> Control who can see your profile and content</li>
                      </ul>
                      
                      <div className="success-box">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">How to Exercise Your Rights</h4>
                            <p className="text-gray-300">
                              To exercise any of these rights, simply contact us through the contact information provided in this policy. We'll respond within 30 days.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Data Retention</h3>
                      <p className="text-gray-300 leading-relaxed">
                        We retain your personal information only as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will permanently delete your personal information within 30 days, except where we are required to retain it for legal purposes.
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact */}
                {activeSection === 'contact' && (
                  <div>
                    <div className="content-section">
                      <h2 className="section-title">
                        <Mail className="w-6 h-6 text-purple-400" />
                        Contact Us
                      </h2>
                      
                      <p className="text-gray-300 leading-relaxed mb-6">
                        If you have any questions about this Privacy Policy or how we handle your personal information, we're here to help.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="highlight-box">
                          <h4 className="font-semibold text-gray-200 mb-3">Privacy Officer</h4>
                          <p className="text-gray-300 mb-2">
                            <strong>Email:</strong> jatinsrivastava4104@gmail.com
                          </p>
                          <p className="text-gray-300 mb-2">
                            <strong>Phone:</strong> (+91) 9919206912
                          </p>
                          <p className="text-gray-300">
                            <strong>Response Time:</strong> Within 48 hours
                          </p>
                        </div>
                        
                        <div className="highlight-box">
                          <h4 className="font-semibold text-gray-200 mb-3">General Support</h4>
                          <p className="text-gray-300 mb-2">
                            <strong>Email:</strong> jatinsrivastava4104@gmail.com
                          </p>
                          <p className="text-gray-300 mb-2">
                            <strong>Live Chat:</strong> Available 24/7
                          </p>
                          <p className="text-gray-300">
                            <strong>Help Center:</strong> jatinsrivastava4104@gmail.com
                          </p>
                        </div>
                      </div>
                      
                      <div className="warning-box mb-6">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-2">Data Protection Authority</h4>
                            <p className="text-gray-300">
                              If you're not satisfied with our response to your privacy concerns, you have the right to file a complaint with your local data protection authority.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <a href="mailto:jatinsrivastava410@gmail.com" className="contact-button">
                          <Mail className="w-5 h-5" />
                          Contact Privacy Team
                        </a>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-200 mb-3">Policy Updates</h3>
                        <p className="text-gray-300 leading-relaxed">
                          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by email and by posting the updated policy on our website. Your continued use of our services after any changes indicates your acceptance of the updated policy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;