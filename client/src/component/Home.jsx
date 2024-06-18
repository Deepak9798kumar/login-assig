import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const location = useLocation();
  const { user } = location.state;

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name); 
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('userId', user._id); 

      const response = await axios.post('http://localhost:5000/api/uploadPdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("File uploaded successfully:", response.data);

      setFileName(file.name);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownload = async () => {
    try {
      console.log("enter in the try")
      const response = await axios.get('http://localhost:5000/api/downloadPdf', {
        responseType: 'blob', 
        params: {
          userId: user._id 
        }
      });
      console.log("response in download :",response)
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${user.name}_pdf.pdf`); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      
    }
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Email: {user.email}</p>
          {fileName && (
            <div>
              <p>Uploaded PDF: {fileName}</p>
              
            </div>
          )}
          <div className="homepdfupload">
            <div className="input-group">
              <span className="input-group-text">Upload PDF</span>
              <input
                type="file"
                aria-label="PDF File"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button className="btn btn-success" onClick={handleUpload}>Upload PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}
