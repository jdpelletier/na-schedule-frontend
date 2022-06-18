import React, { useState, useEffect } from 'react';
import { format } from "date-fns"

import { Table } from "./components/Table/Table";
import { SideBar } from "./components/SideBar/SideBar";
import { Nightlog } from "./components/Nightlog/Nightlog"
import { Links } from "./components/Links/Links"

import "./App.css"

function App () {
  const [schedule, setSchedule] = useState([])
  const [columns, setColumns] = useState([])
  const [holidays, setHolidays] = useState([])
  //TODO figure out why I have to ignore this
  // eslint-disable-next-line
  const [route, setRoute] = useState('signin')
  const [page, setPage] = useState('home')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [names, setNames] = useState([])

  const filteredSchedule = () => {
    if(startDate !== null && endDate !== null){
      return schedule.filter(sched => (sched.Date <= endDate && sched.Date >= startDate));
    }else{
      const d = new Date();
      d.setDate(d.getDate()-14);
      return schedule.filter(sched => (sched.Date >= d));
    }
  }

  const cols = (schedule) => {
    const COLUMNS = [];
    const first = schedule[0];
    const nameholder = [];

    for (var key in first) {
      if (key.length < 4 && key !== 'DOW'){
        nameholder.push(key)
      }
      if (key==='Date'){
        COLUMNS.push(
         {
           Header: key,
           Footer: key,
           accessor: key,
           Cell: ({ value }) => { return format(new Date(value), 'd-MMMM-yyy')}
         }
        )
      }else{
        COLUMNS.push(
         {
           Header: key,
           Footer: key,
           accessor: key
         }
        )
      }
    }
    setNames(nameholder)
    return COLUMNS;
  }

  const todayTime = () => {
    const d = new Date();
    return d.getTime()-(d.getTime()%86400000) - 50400000
  }

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(response => response.json())
      .then(data => {
        setSchedule([...data])
        setColumns([...cols(data)])
      });
    fetch("http://localhost:5000/holidays")
      .then(response => response.json())
      .then(data => {
        const dates = []
        for (var date in data) {
          dates.push(data[date]["Date"])
        }
        setHolidays([...dates])
      });
  }, [])

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false)
    }else if (route === 'signin') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  const onNewSchedule = (data) => {
    setSchedule([...data])
    setColumns([...cols(data)])
  }

  if (schedule.length === 0) {
        return <div />
      }

  if (page === "home"){
    return (
      <div>
        <div className="grid-container">
          <div className="grid-item">
            <Table dat={filteredSchedule()} cols={columns} dateRange={dateRange} setDateRange={setDateRange}
              getCellProps={cellInfo => ({
                style: {
                  fontWeight: cellInfo.value === todayTime() ? "bold" :
                              null,
                  backgroundColor: ["NAH", "NAH2", "NA1"].includes(cellInfo.value) ? "#FFC863" :
                                   cellInfo.value === "SD" ? "#FFFF64" :
                                   cellInfo.value === "HQ" ? "#2EB22E" :
                                   ["L9", "L14"].includes(cellInfo.value) ? "#346beb" :
                                   ["x", "H"].includes(cellInfo.value)  ? "#00D897" :
                                   holidays.includes(cellInfo.value) ? "#ed0c0c" :
                                   // cellInfo.value === null ? "#FFFFFF":
                                   // (cellInfo.value.toString().startsWith('O') && cellInfo.value.length < 4) ? "#FFFFFF":
                                   null
                },
              })}/>
            </div>
            <div className="grid-item">
              <SideBar isSignedIn={isSignedIn} onRouteChange={onRouteChange} onNewSchedule={onNewSchedule}
              names={names} setPage={setPage} />
            </div>
          </div>
      </div>
    );
  }else if(page === "links"){
    return(
      <Links setPage={setPage}/>
    )
  }else if(page === "nightlog"){
    return(
      <Nightlog setPage={setPage}/>
    )
  }
}


export default App;
