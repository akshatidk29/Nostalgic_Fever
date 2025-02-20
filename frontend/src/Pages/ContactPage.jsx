import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">Contact Us</h1>

      {/* Description */}
      <p className="text-lg text-gray-700 max-w-3xl text-center">
        Have questions, suggestions, or want to collaborate? Reach out to us, and we’ll get back to you as soon as possible!
      </p>

      {/* Contact Form */}
      <div className="bg-white shadow-lg p-8 mt-8 rounded-lg max-w-lg w-full">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Email</label>
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea placeholder="Enter your message" rows="4" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all">
            Send Message
          </button>
        </form>
      </div>

      {/* Additional Contact Info */}
      <div className="mt-8 text-gray-700 text-center">
        <p>Email: <span className="text-indigo-600 font-medium">support@krachhack.com</span></p>
        <p>Phone: <span className="text-indigo-600 font-medium">+91 12345 67890</span></p>
        <p>Address: <span className="text-indigo-600 font-medium">IIT Mandi, India</span></p>
      </div>
    </div>
  );
};

export default Contact;
