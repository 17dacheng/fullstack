import React, { useState } from 'react';
import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function StatGraph() {
    const [statType, setStatType] = useState('Placeholder'); // Default selection
    const [imageSrc, setImageSrc] = useState(null); // State to hold the image source

    const handleStats = async () => {
        try {
            const response = await axios({
                url: 'http://192.168.4.6:36628/statistics', // Adjusted to your backend URL
                method: 'POST',
                responseType: 'blob', // Important for handling binary data
                data: { statType }
            });
            const url = URL.createObjectURL(new Blob([response.data]));
            console.log('image url:', url);
            setImageSrc(url);
        } catch (error) {
            console.error('Error fetching statistics image:', error);
        }
    };

    return (
        <div>
            <label>统计维度</label>
            <select
                className="dropdown"
                value={statType}
                onChange={(e) => setStatType(e.target.value)}
                style={{ 
                    width: '200px', 
                    height: '35px', 
                    color: statType === 'Placeholder' ? 'lightgray' : 'black', 
                    marginLeft: '10px' 
                }}
            >
                <option value="Placeholder">placeholder</option>
                <option value="EC">EC分布</option>
                <option value="Kcat">Kcat分布</option>
                <option value="Substrate">Substrate分布</option>
            </select>
            <button onClick={handleStats} className="execute-button">执行</button>
            <div style={{ marginTop: '20px' }}>统计图如下</div>
            {imageSrc && <img src={imageSrc} alt="Statistics" style={{ marginTop: '10px' }} />}
        </div>
    );
}

export default StatGraph;