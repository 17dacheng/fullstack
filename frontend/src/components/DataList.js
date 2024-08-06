import React from 'react';

function DataList({ dataList, dataCount }) {
    return (
        <div>
            <label>数据数量: {dataCount}</label>
            <table>
                <thead>
                    <tr>
                        <th>EC Number</th>
                        <th>UniprotID</th>
                        <th>EntryID</th>
                        <th>Substrate</th>
                        <th>kcat</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ec_number}</td>
                            <td>{item.uniprot_id}</td>
                            <td>{item.entry_id}</td>
                            <td>{item.substrate}</td>
                            <td>{item.kcat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataList;