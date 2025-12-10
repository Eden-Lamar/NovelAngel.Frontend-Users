// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // });

  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //       alert("Thank you for your message! We'll get back to you shortly.");
  //       setIsSubmitting(false);
  //       setFormData({ name: '', email: '', subject: '', message: '' });
  //   }, 1500);
  // };

  return (
    <div className="bg-gray-50 dark:bg-[#0f1419] py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-cyan-500 transition-colors mb-6 text-sm font-medium">
                <IoArrowBack className="text-lg" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl py-1.5 font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 font-vibes">
                Get in Touch
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
        </div>

        <div className="w-full flex items-center justify-center">
            
            {/* Left Column: Contact Information Card */}
            <div className="w-full md:w-1/3 space-y-6">
                <div className="bg-white dark:bg-[#1a1b23] rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800/50 h-full relative overflow-hidden group">
                    
                    {/* Decorative Background Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-700 group-hover:bg-gold/20" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -ml-10 -mb-10 transition-all duration-700 group-hover:bg-cyan-500/20" />

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 font-vibes-secondary relative z-10">
                        Contact Information
                    </h3>

                    <div className="space-y-8 relative z-10">
                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                                <FaEnvelope className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Us</p>
                                <a href="mailto:Novelangel@gmail.com" className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-gold transition-colors break-all">
                                    Novelangel@gmail.com
                                </a>
                            </div>
                        </div>
												
                        {/* Phone Number */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-500">
                                <FaPhoneAlt className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                                <a href="tel:+2349129216405" className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-gold transition-colors">
                                    +234 912 921 6405
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-500">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Business Address</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-snug">
                                    8A Muhammed Ameuru, <br/>
                                    Ikotun, Lagos
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Note */}
                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 relative z-10">
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            "We respond to all inquiries within 24 hours."
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Send Message Form */}
            {/* <div className="lg:col-span-3">
                <div className="bg-white dark:bg-[#1a1b23] rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800/50">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 font-vibes-secondary">
                        Send us a Message
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                            <input 
                                type="text" 
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all"
                                placeholder="What is this about?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea 
                                name="message"
                                required
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all resize-none"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-gold to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                'Sending...'
                            ) : (
                                <>
                                    Send Message <FaPaperPlane className="text-sm" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div> */}

        </div>
      </div>
    </div>
  );
};

export default ContactUs;