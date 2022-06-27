import React, { useState, useEffect, useCallback } from 'react';
import { format } from "date-fns"

import { Table } from "./components/Table/Table";
import { SideBar } from "./components/SideBar/SideBar";
import { Nightlog } from "./components/Nightlog/Nightlog";
import NightlogSubmission from "./components/NightlogSubmission/NightlogSubmission"
import { Links } from "./components/Links/Links";
import NavMenu from "./components/NavMenu/NavMenu";

import "./App.css"

function App () {

  const ip = "192.168.122.1"
  const port = "53872"
  const [schedule, setSchedule] = useState([])
  const [columns, setColumns] = useState([])
  const [holidays, setHolidays] = useState([])
  const [staff, setStaff] = useState('')
  //TODO figure out why I have to ignore this
  // eslint-disable-next-line
  const [route, setRoute] = useState('signin')
  const [page, setPage] = useState('home')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [names, setNames] = useState([])
  const [logtoview, setLogtoview] = useState({});
  const [editNL, setEditNL] = useState(false)


  const filteredSchedule = () => {
    if(startDate !== null && endDate !== null){
      return schedule.filter(sched => (sched.Date <= endDate && sched.Date >= startDate));
    }else{
      const d = new Date();
      d.setDate(d.getDate()-14);
      return schedule
      // return schedule.filter(sched => (sched.Date >= d));
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
           Cell: ({ value }) => { return format(new Date(value), 'd-MMMM-yy')}
         }
        )
      }else if (key!=='Holiday'){
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

  const convertTime = (d) => {
    return d.getTime()-(d.getTime()%86400000) - 50400000
  }

  const findStaffandHolidays = useCallback((data)=> {
    const hol = []
    for (var day in data){
      if(data[day].Holiday === 'X'){
        hol.push(data[day].Date)
      }
      if(data[day].Date === convertTime(new Date())) {
        parseStaff(data[day])
      }
    }
    setHolidays([...hol])
  }, [])

  useEffect(() => {
    fetch(`http://${ip}:${port}/`)
      .then(response => response.json())
      .then(data => {
        setSchedule([...data])
        setColumns([...cols(data)])
        findStaffandHolidays(data)
      });
  }, [findStaffandHolidays])

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
    findStaffandHolidays(data)
  }

  const parseStaff = (day) => {
    const working = []
    for(var key in day){
      if(['NAH', 'NA1', 'NAH2'].includes(day[key])){
        working.push(key + " " + day[key])
      }
    }
    setStaff(working)
  }

  let table = <Table dat={filteredSchedule()} cols={columns} dateRange={dateRange} setDateRange={setDateRange} holidays={holidays} today={convertTime(new Date())}
                getCellProps={cellInfo => ({
                  style: {
                    backgroundColor: ["NAH", "NAH2", "NA1"].includes(cellInfo.value) ? "#FFC863" :
                                     cellInfo.value === "SD" ? "#FFFF64" :
                                     cellInfo.value === "HQ" ? "#2EB22E" :
                                     ["L9", "L14"].includes(cellInfo.value) ? "#346beb" :
                                     ["x", "H"].includes(cellInfo.value)  ? "#00D897" :
                                     null
                  },
                })}/>

  let width = window.innerWidth;

  if (schedule.length === 0) {
        return <div />
      }

  if (page === "home"){
    if(width>750){
      return (
        <div>
          <div className="grid-container">
            <div className="tablewrapDesktop">
                {table}
              </div>
              <div className="sidebar-item">
                <SideBar isSignedIn={isSignedIn} onRouteChange={onRouteChange} onNewSchedule={onNewSchedule}
                         names={names} setPage={setPage} staff={staff} ip={ip} port={port}/>
              </div>
            </div>
        </div>
      );
    }else{
      return (
        <div>
          <NavMenu page={"home"} setPage={setPage} />
          <div className="tablewrapMobile">
            {table}
          </div>
        </div>
      );
    }
  }else if(page === "links"){
    return(
      <Links setPage={setPage} />
    )
  }else if(page === "nightlogs"){
    return(
      <Nightlog setPage={setPage} logtoview={logtoview} setLogtoview={setLogtoview} setEditNL={setEditNL} ip={ip} port={port}/>
    )
  }else if(page === "submitnightlog"){
    return(
      <NightlogSubmission setPage={setPage} logtoview={logtoview} editNL={editNL} setEditNL={setEditNL} ip={ip} port={port}/>
    )
  }
}


export default App;
