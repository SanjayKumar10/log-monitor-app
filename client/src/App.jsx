import { useState } from 'react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState([]);
  const [file, setFile] = useState(null);

  const handleDownloadPDF = async () => {
    if (!file) return alert("Please select a log file.");
    const formData = new FormData();
    formData.append("logfile", file);

    try {
      const response = await axios.post('http://localhost:4000/report/pdf', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'log-report.pdf';
      a.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a log file.");
    const formData = new FormData();
    formData.append("logfile", file);

    try {
      const res = await axios.post('http://localhost:4000/upload', formData);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Log Monitor</h1>
      <input type="file" accept=".log" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDownloadPDF}>Download PDF</button>

      <ul>
        {result.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
