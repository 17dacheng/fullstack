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
            const result = await axios.post('http://192.168.4.6:36628/search', data);
            console.log('Received response:', result.data); // 打印服务器响应
    
            const transformedData = result.data.map(item => ({
                ec_number: item[0],
                organism: item[1],
                enzyme_type: item[2],
                reactants: item[3],
                substrate: item[4],
                kcat: item[5],
                unit: item[6],
                PH: item[7],
                Temp: item[8],
                uniprot_id: item[9],
                sequence: item[10],
                smiles: item[11],
                PubMedID: item[12]
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