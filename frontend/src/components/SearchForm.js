import React, { useState } from 'react';
import axios from 'axios';

function SearchForm({ setDataList, setDataCount }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('Entryid'); // 默认选择Entryid

    const handleSearch = async () => {
        const data = { searchType, searchValue };
        
        // 打印传递给后端的JSON数据
        console.log('Sending JSON to backend:', data);

        try {
            const result = await axios.post('http://192.168.4.6:34014/search', data);
            console.log('Received response:', result.data); // 打印服务器响应
            // setDataList(result.data.dataList);
            // setDataCount(result.data.dataCount);
            // setDataList(result.data || []); // Directly use the array
            // setDataCount(result.data.length || 0); // Use the length of the array    
            const transformedData = result.data.map(item => ({
                ec_number: item[0],
                uniprot_id: item[1],
                entry_id: item[2],
                substrate: item[3],
                kcat: item[4]
            }));
            setDataList(transformedData || []);
            setDataCount(transformedData.length || 0);            
        } catch (error) {
            console.error('Error during search:', error);
            setDataList([]);
            setDataCount(0);            
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label>搜索条件</label>
                <select className="dropdown" value={searchType} onChange={(e) => setSearchType(e.target.value)} style={{ marginLeft: '10px' }}>
                    <option value="Entryid">Entryid</option>
                    <option value="EC">EC number</option>
                    <option value="UniprotID">UniprotID</option>
                    <option value="Sequence">Sequence</option>
                    <option value="Substrate">Substrate</option>
                </select>
                <button onClick={handleSearch} style={{ marginLeft: '10px' }}>执行</button>
            </div>
            <div>
                <input
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>
        </div>
    );
}

export default SearchForm;