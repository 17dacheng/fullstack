import React, { useState } from 'react';
import axios from 'axios';

function UploadDataProc() {
    const [file, setFile] = useState(null);

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post('http://192.168.4.6:34014/upload', formData);
        // await axios.post('http://localhost:5000/upload', formData);
    };

    return (
        <div>
            <label>数据处理代码</label>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>执行</button>
        </div>
    );
}

export default UploadDataProc;