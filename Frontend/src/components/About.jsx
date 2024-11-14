import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          Campus Manager is dedicated to revolutionizing educational administration
          through innovative digital solutions. We strive to make student and faculty
          management more efficient, transparent, and user-friendly.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-lg mb-2">Student Management</h3>
            <p className="text-gray-600">
              Comprehensive student record management with easy access and updates.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg mb-2">Faculty Directory</h3>
            <p className="text-gray-600">
              Organized faculty information system with department-wise categorization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 