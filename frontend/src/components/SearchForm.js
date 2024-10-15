// SearchForm.js
import React, { useState } from 'react';
import axios from 'axios';

function SearchForm({ setDataList, setDataCount }) {
    const [searchForms, setSearchForms] = useState([{ id: 1, searchType: 'Type', searchValue: 'Value' }]);

    const addSearchForm = () => {
        setSearchForms([...searchForms, { id: searchForms.length + 1, searchType: 'Type', searchValue: 'Value' }]);
    };    

    const removeSearchForm = (id) => {
        if (searchForms.length > 1) {
            setSearchForms(searchForms.filter(form => form.id !== id));
        }
    };

    const handleSearch = async () => {
        try {
            const allResults = [];
            for (const form of searchForms) {
                const result = await axios.post('http://192.168.4.6:36628/search', [form]);
                const transformedData = result.data.map(item => ({
                    ECNumber: item[0],
                    Organism: item[1],
                    UniprotID: item[2],
                    EnzymeType: item[3],
                    Substrate: item[4],
                    pH: item[5],
                    Temperature: item[6],
                    Value: item[7],
                    Unit: item[8],
                    Reaction: item[9],
                    Sequence: item[10],
                    smiles: item[11],
                    literature: item[12]
                }));
                // Print the length of each transformedData
                console.log(`Length of transformedData for form ${form.id}:`, transformedData.length);                
                allResults.push(transformedData);
            }

            // Find intersection of all results
            let intersection = allResults.reduce((acc, current) =>
                acc.filter(item => current.some(other => other.ECNumber === item.ECNumber))
            );

            // Sort by ECNumber
            intersection.sort((a, b) => (a.ECNumber > b.ECNumber ? 1 : -1));

            setDataList(intersection || []);
            setDataCount(intersection.length || 0);
        } catch (error) {
            console.error('Error during search:', error);
            setDataList([]);
            setDataCount(0);
        }
    };

    return (
        <div>
            {searchForms.map((form, index) => (
                <div key={form.id} className="search-form-row">
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        {index === 0 && <label>筛选条件</label>}
                        <select
                            className="dropdown"
                            value={form.searchType}
                            onChange={(e) => setSearchForms(searchForms.map(f => f.id === form.id ? { ...f, searchType: e.target.value } : f))}
                            style={{ 
                                width: '200px', 
                                height: '35px', 
                                color: form.searchType === 'Type' ? 'lightgray' : 'black', 
                                marginLeft: index === 0 ? '10px' : '80px' 
                            }}
                        >
                            <option value="Type">Type</option>
                            <option value="EC">EC number</option>
                            <option value="UniprotID">UniprotID</option>
                            <option value="Sequence">Sequence</option>
                            <option value="Substrate">Substrate</option>
                        </select>
                        <input
                            type='text'
                            value={form.searchValue}
                            placeholder="Value"
                            onFocus={(e) => e.target.value === 'Value' && setSearchForms(searchForms.map(f => f.id === form.id ? { ...f, searchValue: '' } : f))}
                            onChange={(e) => setSearchForms(searchForms.map(f => f.id === form.id ? { ...f, searchValue: e.target.value } : f))}
                            style={{ 
                                width: '200px', 
                                height: '30px', 
                                marginLeft: '10px', 
                                color: form.searchValue ? 'black' : 'lightgray' 
                            }}
                        />
                        <span
                            onClick={() => removeSearchForm(form.id)}
                            style={{ marginLeft: '10px', cursor: 'pointer', color: 'gray' }}
                        >
                            x
                        </span>
                        {index === 0 && (
                            <div className="button-group" style={{ marginLeft: '10px' }}>
                                <button onClick={handleSearch} className="search-button">查询</button>
                                <button className="reset-button">重置</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div style={{ marginBottom: '10px' }}> {/* Add margin here */}
                <span 
                    onClick={addSearchForm} 
                    style={{ 
                        cursor: 'pointer', 
                        color: 'blue', 
                        textDecoration: 'underline', 
                        marginLeft: '80px' 
                    }}
                >
                    新增筛选条件
                </span>
            </div>
        </div>
    );
}

export default SearchForm;