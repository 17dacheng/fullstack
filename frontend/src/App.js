// App.js
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataList';
import StatGraph from './components/StatGraph';
import './styles.css';

function App() {
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState(0);

    const handleDownload = () => {
        const dataStr = JSON.stringify(dataList, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    console.log('DataList in App:', dataList); // Add this line to log dataList

    return (
        <div className="app-container">
            <div className="left-side">
                <h1>MoleculeMind酶活性数据库</h1>
                <SearchForm setDataList={setDataList} setDataCount={setDataCount} />
                <StatGraph />
            </div>
            <div className="divider"></div>
            <div className="right-side">
                <div className="data-list-container">
                    <div className="data-count-container fixed-header">
                        <p>Data Count: {dataCount}</p>
                        <button onClick={handleDownload} className="download-button">Download</button>
                    </div>
                    <DataTable dataList={dataList} />
                </div>
            </div>
        </div>
    );
}

export default App;