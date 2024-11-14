import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Studentlist from "./components/Studentlist";
import Facultylist from "./components/Facultylist";
import BulkUpload from "./components/BulkUpload";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-indigo-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-white">
                  Campus Manager
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                >
                  Home
                </Link>
                <Link
                  to="/students"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                >
                  Students
                </Link>
                <Link
                  to="/faculty"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                >
                  Faculty
                </Link>
                <Link
                  to="/bulk-upload"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                >
                  Bulk Upload
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition duration-150"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Studentlist />} />
            <Route path="/faculty" element={<Facultylist />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Campus Manager</h3>
                <p className="text-sm text-gray-300">Managing education efficiently</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                <a href="#" className="hover:text-gray-300">Terms of Service</a>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              © 2024 Campus Manager. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
