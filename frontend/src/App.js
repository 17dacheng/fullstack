import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import DataList from './components/DataList';
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

    return (
        <div className="app-container">
            <div className="left-side">
                <h1>Moleculemind酶活性数据库</h1> {/* 添加标题 */}
                <SearchForm setDataList={setDataList} setDataCount={setDataCount} />
                <div className="spacer"></div> {/* 添加空行 */}
                <StatGraph />
            </div>
            <div className="divider"></div> {/* 添加分隔线 */}
            <div className="right-side">
                <div className="data-list-container">
                    <div className="data-count-container">
                        <p>Data Count: {dataCount}</p> {/* Display the data count */}
                        <button onClick={handleDownload} className="download-button">Download</button>
                    </div>
                    <DataList dataList={dataList} dataCount={dataCount} />
                </div>
            </div>
        </div>
    );
}

export default App;