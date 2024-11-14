import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [counts, setCounts] = useState({
    students: 0,
    faculty: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, facultyRes] = await Promise.all([
          axios.get('https://crudmvc-dgiv.onrender.com/api/students'),
          axios.get('https://crudmvc-dgiv.onrender.com/api/faculty')
        ]);
        setCounts({
          students: studentsRes.data.length,
          faculty: facultyRes.data.length
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-indigo-800 mb-4">
          Welcome to Campus Manager
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Student Count */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Students</h2>
          </div>
          <div className="text-5xl font-bold mb-2">{counts.students}</div>
          <p className="text-green-100">Total Students</p>
        </div>

        {/* Faculty Count */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Faculty</h2>
          </div>
          <div className="text-5xl font-bold mb-2">{counts.faculty}</div>
          <p className="text-blue-100">Total Faculty</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 
