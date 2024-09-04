import React, { useRef, useEffect } from 'react';
import './DataTable.css'; // Import the CSS file

function DataTable({ dataList }) {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = tableRef.current;
        if (!table) return; // Ensure the table is available

        const cols = table.querySelectorAll('th');

        cols.forEach((col, index) => {
            const resizer = document.createElement('div');
            resizer.className = 'resizer';
            col.appendChild(resizer);

            resizer.addEventListener('mousedown', (e) => {
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);

                let startX = e.pageX;
                let startWidth = col.offsetWidth;

                function onMouseMove(e) {
                    const newWidth = startWidth + (e.pageX - startX);
                    col.style.width = `${newWidth}px`;
                    table.querySelectorAll('tr').forEach(row => {
                        row.children[index].style.width = `${newWidth}px`;
                    });
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }
            });
        });
    }, []);

    if (!dataList.length) {
        return <div>No data available</div>;
    }

    return (
        <div className="data-table-container">
            <table className="data-table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>EC Number</th>
                        <th>Organism</th>
                        <th>Enzyme Type</th>
                        <th>Reactants</th>
                        <th>Substrate</th>
                        <th>Kcat</th>
                        <th>Unit</th>
                        <th>PH</th>
                        <th>Temp</th>
                        <th>Uniprot ID</th>
                        <th>Sequence</th>
                        <th>Smiles</th>
                        <th>PubMed ID</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ec_number}</td>
                            <td>{item.organism}</td>
                            <td>{item.enzyme_type}</td>
                            <td>{item.reactants}</td>
                            <td>{item.substrate}</td>
                            <td>{item.kcat}</td>
                            <td>{item.unit}</td>
                            <td>{item.PH}</td>
                            <td>{item.Temp}</td>
                            <td>{item.uniprot_id}</td>
                            <td>{item.sequence}</td>
                            <td>{item.smiles}</td>
                            <td>{item.PubMedID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;