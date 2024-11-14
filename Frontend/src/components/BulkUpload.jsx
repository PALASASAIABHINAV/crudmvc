import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const BulkUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check file type
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      setError("Please upload only Excel files (.xlsx or .xls)");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should not exceed 5MB");
      return;
    }

    setIsUploading(true);
    setError("");
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
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
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Error uploading file");
      setUploadStatus("");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">Bulk Upload</h1>

        {/* Upload Area */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">
            Upload Student Data
          </h2>

          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-gray-600">
                {isDragActive ? (
                  <p className="text-purple-600">Drop the file here ...</p>
                ) : (
                  <div>
                    <p className="text-lg">
                      Drag and drop your Excel file here, or{" "}
                      <span className="text-purple-600 font-medium">
                        click to browse
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Only Excel files (.xlsx, .xls) are supported
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {isUploading && (
            <div className="mt-4 p-4 bg-purple-50 text-purple-700 rounded-md flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading...
            </div>
          )}
          {uploadStatus && !isUploading && (
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                File Format Requirements:
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>File must be in Excel format (.xlsx or .xls)</li>
                <li>The first row should contain column headers</li>
                <li>Required columns: name, email, grade</li>
                <li>Each row should represent one student</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sample Format:
              </h3>
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
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Abhinav
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        psaiabhinav1724@gmail.com
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
