import React, { useMemo }  from 'react'
import { useTable, useFilters} from 'react-table'
import { format } from "date-fns"

import './Table.css'
import { ColumnFilter } from './ColumnFilter'
import DateSelector from "../DateSelector/DateSelector"


export const Table = ({dat, cols, dateRange, setDateRange, getCellProps, hiddenColumns=[]}) => {

  const columns = useMemo(() => cols, [cols])
  const data = useMemo(() => dat, [dat])

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
      Dates: DateSelector
    }
  }, [])

  const telSchedule = (date) => {
    const day = format(new Date(date), 'yyy-MM-d')
    window.open('https://www2.keck.hawaii.edu/observing/keckSchedule/keckSchedule.php?cmd=getSchedule&date=' + day, "_blank")
  }

  // const isolateColumn = (line) => {
  //   console.log(line)
  // }

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
    telSchedule,
    initialState: {
      hiddenColumns: hiddenColumns
    }
  },
  useFilters)

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <div className="tablewrap">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map( (column) => (
                      <th {...column.getHeaderProps()}><div className="checkmark"><input type='checkbox' {...column.getToggleHiddenProps()} /></div><br></br>{column.render('Header')}
                        {column.Header === "Date" ? column.canFilter=false : null}
                        <div>{column.canFilter ? column.render('Filter') : <DateSelector dateRange={dateRange} setDateRange={setDateRange} />}</div>
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
                          if (cell.column.Header==="Date") {
                            telSchedule(row.original.Date, e)
                          }
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
