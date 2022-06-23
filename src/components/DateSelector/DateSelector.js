import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css"

const DateSelector = ({ dateRange, setDateRange }) => {

  const [startDate, endDate] = dateRange;
  const [searching, setSearching] = useState(false)

  let output;

  if(searching){
    output = <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {setDateRange(update);}} isClearable={true}
                monthsShown={2}
              />

  }else{
    output = <button onClick={() => setSearching(true)}>&#x1F50D;</button>
  }

  return(
    <div>
      {output}
    </div>
  )
}

export default DateSelector
