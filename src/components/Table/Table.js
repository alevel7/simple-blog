import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table'
import './Table.css';

import PropTypes from 'prop-types';




const Table = ({ prop_columns = [], custom_data = [] }) => {
    const columns = useMemo(() => prop_columns, [])
    const data = useMemo(() => custom_data, [custom_data])

    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns, data
    })

    const handleRowRoute = (id) => {
        //this would send the page to a detail page
    }
    return (
        <div>
            {/* <Preloader loading={status==='pending'}/> */}
            <table {...getTableProps()} className='table'>
                <thead >
                    {
                        headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {
                                    headerGroup.headers.map((column, columnIndex) => {
                                        return (
                                            <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>
                                        )
                                    })
                                }
                            </tr>

                        ))
                    }
                </thead>

                <tbody {...getTableProps()}>
                    {
                        rows.map((row, index) => {
                            let id = row.original.id

                            prepareRow(row)
                            return <tr {...row.getRowProps()} key={index} onClick={(e) => handleRowRoute(id)}>
                                {
                                    row.cells.map((cell, cellIndex) => <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>)
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    prop_columns: PropTypes.array,
    custom_data: PropTypes.array,
}


export default Table