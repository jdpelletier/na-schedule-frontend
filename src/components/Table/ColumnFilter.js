import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const ColumnFilter = ({ column }) => {
  const {filterValue, setFilter} = column

  const [value, setValue] = useState(filterValue)

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 300)

  let width = window.innerWidth;
  let inSize;

  if(width>750){
    inSize = "4"
  }else{
    inSize="1"
  }

  return (
    <span>
      <div className="searchinput">
        &#x1F50D;
        <input size={inSize} value={value || ''} onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        />
      </div>
    </span>
  )
}
