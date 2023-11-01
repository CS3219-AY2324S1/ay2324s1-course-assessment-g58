import React from 'react';
import { useTable } from 'react-table';

const HistoryTable = ({ data }) => {
 const columns = React.useMemo(
   () => [
     {
       Header: 'Date Time',
       accessor: 'dateTime',
     },
     {
       Header: 'Question Title',
       accessor: 'question.title',
     },
     {
       Header: 'View Response',
       accessor: 'response',
       Cell: ({ value }) => <a href="#" onClick={() => openModal(value)}>View</a>,
     },
   ],
   []
 );

 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({ columns, data });

 return (
   <table {...getTableProps()} style={{ margin: 'auto' }}>
     <thead>
       {headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
           ))}
         </tr>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {rows.map(row => {
         prepareRow(row);
         return (
           <tr {...row.getRowProps()}>
             {row.cells.map(cell => (
               <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
             ))}
           </tr>
         );
       })}
     </tbody>
   </table>
 );
};

export default HistoryTable;
