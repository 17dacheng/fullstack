import React, { useRef, useEffect } from 'react';
import './DataTable.css'; // Import the CSS file

function DataTable({ dataList }) {
    console.log('DataList received:', dataList.length); // Debugging line
    const tableRef = useRef(null);

    useEffect(() => {
        const table = tableRef.current;
        if (!table) return; // Ensure the table is available

        const cols = table.querySelectorAll('th');

        cols.forEach((col, index) => {
            const resizer = document.createElement('div');
            resizer.className = 'resizer';
            col.style.position = 'relative'; // Ensure the column has relative positioning
            col.appendChild(resizer);

            resizer.style.position = 'absolute';
            resizer.style.right = '0';
            resizer.style.top = '0';
            resizer.style.bottom = '0';
            resizer.style.width = '10px';
            resizer.style.cursor = 'col-resize';
            resizer.style.zIndex = '1';

            // Mouse down and drag to resize the column
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

            // Double-click to resize column to fit content
            resizer.addEventListener('dblclick', () => {
                let maxWidth = 0;
                table.querySelectorAll('tr').forEach(row => {
                    const cell = row.children[index];
                    if (cell) {
                        const cellWidth = cell.scrollWidth;
                        if (cellWidth > maxWidth) {
                            maxWidth = cellWidth;
                        }
                    }
                });
                col.style.width = `${maxWidth}px`;
                table.querySelectorAll('tr').forEach(row => {
                    row.children[index].style.width = `${maxWidth}px`;
                });
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
                        <th>UniprotID</th>
                        <th>EnzymeType</th>
                        <th>Substrate</th>
                        <th>PH</th>
                        <th>Temperature</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Reaction</th>
                        <th>Sequence</th>
                        <th>Smiles</th>
                        <th>Literature</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ECNumber}</td>
                            <td>{item.Organism}</td>
                            <td>{item.UniprotID}</td>
                            <td>{item.EnzymeType}</td>
                            <td>{item.Substrate}</td>
                            <td>{item.pH}</td>
                            <td>{item.Temperature}</td>
                            <td>{item.Value}</td>
                            <td>{item.Unit}</td>
                            <td>{item.Reaction}</td>
                            <td>{item.Sequence}</td>
                            <td>{item.smiles}</td>
                            <td>{item.literature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;