import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [counts, setCounts] = useState({
    students: 0,
    faculty: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, facultyRes] = await Promise.all([
          axios.get("http://localhost:5000/api/students"),
          axios.get("http://localhost:5000/api/faculty")
        ]);
        setCounts({
          students: studentsRes.data.length,
          faculty: facultyRes.data.length
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Campus Manager
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive solution for managing student and faculty information efficiently.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold opacity-90">Total Students</p>
                <h3 className="text-4xl font-bold mt-2">{counts.students}</h3>
              </div>
              <div className="text-5xl opacity-80">
                👨‍🎓
              </div>
            </div>
            <Link 
              to="/students"
              className="mt-4 inline-block bg-white text-green-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-50 transition-colors duration-300"
            >
              View Details →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold opacity-90">Total Faculty</p>
                <h3 className="text-4xl font-bold mt-2">{counts.faculty}</h3>
              </div>
              <div className="text-5xl opacity-80">
                👨‍🏫
              </div>
            </div>
            <Link 
              to="/faculty"
              className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-3xl mb-4">📊</div>
          <h2 className="text-xl font-semibold mb-4">Student Management</h2>
          <p className="text-gray-600 mb-4">
            Easily manage student records, attendance, and academic performance.
          </p>
          <Link
            to="/students"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Students →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-3xl mb-4">👥</div>
          <h2 className="text-xl font-semibold mb-4">Faculty Directory</h2>
          <p className="text-gray-600 mb-4">
            Access and manage faculty information and department assignments.
          </p>
          <Link
            to="/faculty"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Faculty →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-3xl mb-4">📁</div>
          <h2 className="text-xl font-semibold mb-4">Bulk Operations</h2>
          <p className="text-gray-600 mb-4">
            Efficiently upload and manage multiple records at once.
          </p>
          <Link
            to="/bulk-upload"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Start Upload →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 