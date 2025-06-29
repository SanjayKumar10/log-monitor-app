import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [result, setResult] = useState([]);
  const [file, setFile] = useState(null);

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
      alert("PDF download failed");
    }
  };

  return (
    <div className="app">
      <h1>🧾 Log Monitor App</h1>

      <div className="upload-box">
        <label htmlFor="file">📁 Upload a .log file</label>
        <input
          id="file"
          type="file"
          accept=".log"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <span className="filename">📄 {file.name}</span>}

        <div className="buttons">
          <button onClick={handleUpload}>Analyze</button>
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      </div>

      {result.length > 0 && (
        <div className="results">
          <h2>📊 Analysis Results</h2>
          <ul>
            {result.map((line, idx) => (
              <li
                key={idx}
                className={
                  line.startsWith('✅') ? 'ok' :
                  line.startsWith('⚠️') ? 'warn' :
                  line.startsWith('❌') ? 'error' : ''
                }
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
