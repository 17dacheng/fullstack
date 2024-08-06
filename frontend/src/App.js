import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import DataList from './components/DataList';
import StatGraph from './components/StatGraph';
import './styles.css';

function App() {
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState(0);

    return (
        <div className="app-container">
            <div className="left-side">
                <h1>Moleculemind酶活性数据库</h1> {/* 添加标题 */}
                <SearchForm setDataList={setDataList} setDataCount={setDataCount} />
                <div className="spacer"></div> {/* 添加空行 */}
                <StatGraph />
            </div>
            <div className="right-side">
                <DataList dataList={dataList} dataCount={dataCount} />
            </div>
        </div>
    );
}

export default App;


// import React, { useState } from 'react';
// import SearchForm from './components/SearchForm';
// import DataList from './components/DataList';
// import StatGraph from './components/StatGraph';
// import UploadDataProc from './components/UploadDataProc';
// import './styles.css';

// function App() {
//     const [dataList, setDataList] = useState([]);
//     const [dataCount, setDataCount] = useState(0);

//     return (
//         <div>
//             <SearchForm setDataList={setDataList} setDataCount={setDataCount} />
//             <UploadDataProc />
//             <DataList dataList={dataList} dataCount={dataCount} />
//             <StatGraph />
//         </div>
//     );
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';
