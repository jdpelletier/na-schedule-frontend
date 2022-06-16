import React, { useMemo }  from 'react'
import { useTable, useFilters} from 'react-table'
import './LogTable.css'
import { ColumnFilter } from './ColumnFilter'


export const LogTable = ({dat, cols, getCellProps, hiddenColumns=[], openLog}) => {

  const columns = useMemo(() => cols, [cols])
  const data = useMemo(() => dat, [dat])

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  }  = useTable({
    columns,
    data,
    defaultColumn,
    openLog,
    initialState: {
      hiddenColumns: hiddenColumns
    }
  },
  useFilters)

  return (
    <>
      <div>
        <div>
          <div className="logtablewrap">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map( (column) => (
                      <th {...column.getHeaderProps()}><div className="checkmark"><input type='checkbox' {...column.getToggleHiddenProps()} /></div><br></br>{column.render('Header')}
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </th>))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row=> {
                  prepareRow(row)
                  return (
                    <tr className={row.original.DOW} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps([getCellProps(cell)])} onClick={(e) => {
                          openLog(row.original.LogID, e)
                        }}>
                        {cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                  })}
              </tbody>
              <tfoot>
                {footerGroups.map((footerGroup) => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                      {footerGroup.headers.map(column => (
                          <td {...column.getFooterProps}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                  ))}
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
