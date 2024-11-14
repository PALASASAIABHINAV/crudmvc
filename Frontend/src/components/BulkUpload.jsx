import React, { useState } from "react";
import axios from "axios";

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setUploadStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        "http://localhost:5000/api/students/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(`Successfully uploaded ${response.data.count} records`);
      setFile(null);
      // Reset the file input
      e.target.reset();
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Error uploading file");
      setUploadStatus("");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">Bulk Upload</h1>

        {/* Upload Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Upload Student Data</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excel File (.xlsx)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Upload File
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {uploadStatus && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              {uploadStatus}
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-purple-50">
            <h2 className="text-2xl font-semibold text-purple-800">Instructions</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">File Format Requirements:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>File must be in Excel format (.xlsx or .xls)</li>
                <li>The first row should contain column headers</li>
                <li>Required columns: name, email, grade</li>
                <li>Each row should represent one student</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sample Format:</h3>
              <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase">
                        name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase">
                        email
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase">
                        grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-600">John Doe</td>
                      <td className="px-4 py-2 text-sm text-gray-600">john@example.com</td>
                      <td className="px-4 py-2 text-sm text-gray-600">A</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-600">Jane Smith</td>
                      <td className="px-4 py-2 text-sm text-gray-600">jane@example.com</td>
                      <td className="px-4 py-2 text-sm text-gray-600">B+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Notes:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All fields are required for each student</li>
                <li>Email addresses must be unique</li>
                <li>Maximum file size: 5MB</li>
                <li>The system will validate all records before importing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
