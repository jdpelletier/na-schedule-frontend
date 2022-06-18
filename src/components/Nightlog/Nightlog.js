import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import NightlogSubmission from "../NightlogSubmission/NightlogSubmission"
import { LogTable } from "./LogTable"
import './Nightlog.css'
import NavMenu from "../NavMenu/NavMenu"

export const Nightlog = ({setPage}) => {

  const [logs, setLogs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [viewlog, setViewlog] = useState(false);
  const [logid, setLogid] = useState("0");
  const [logtoview, setLogtoview] = useState({});

  const cols = (nightlog) => {
    const COLUMNS = [];
    const first = nightlog[0];
    const last = nightlog[nightlog.length - 1]
    setLogid(parseInt(last.LogID) + 1)

    for (var key in first) {
      if(key !== "Details"){
        COLUMNS.push(
         {
           Header: key,
           Footer: key,
           accessor: key
         }
        )
      }

    }
    return COLUMNS;
  }

  useEffect(() => {
    fetch("http://localhost:5000/nightlogs")
      .then(response => response.json())
      .then(data => {
        setLogs([...data])
        setColumns([...cols(data)])
      });
  }, [])

  const openLog = (lid) => {
    let opts = {
      'LogID': lid,
    }
    fetch('http://localhost:5000/viewnightlog', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts)
    }).then(response => response.json())
      .then(data => {
        setLogtoview(data)
        setViewlog(true)
      })
  }

  const back = () => {
    setViewlog(false)
    setSubmit(false)
  }

  if (submit === true){
    return(
      <div>
        <NavMenu page={"nightlog"} setPage={setPage} setSubmit={setSubmit} setViewlog={setViewlog}/>
        <NightlogSubmission setSubmit={setSubmit} setLogs={setLogs} logid={logid}/>
      </div>
    )
  }else if (viewlog === true){
    return(
      <div>
        <NavMenu page={"nightlog"} setPage={setPage} setSubmit={setSubmit} setViewlog={setViewlog} />
        <Card className="bg-black-70 text-white" style={{ width: '50rem' }}>
          <Card.Body>
            <Card.Title className="f3" style={{ height: '2rem' }}>{logtoview.Topic}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
               Submitted by: {logtoview.Name} on {logtoview.Date}<br/>
              {logtoview.Keyword}
            </Card.Subtitle>
            <Card.Text className="f4">
              {logtoview.Details}
            </Card.Text>
            <Button variant="secondary" onClick={back}>Back</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }else{
    return(
      <div>
        <NavMenu page={"nightlog"} setPage={setPage} setSubmit={setSubmit} setViewlog={setViewlog} />
        <LogTable dat={logs} cols={columns} openLog={openLog}
          getCellProps={cellInfo => ({
            style: {
              backgroundColor: //["NAH", "NAH2", "NA1"].includes(cellInfo.value) ? "#FFC863" :
                               // cellInfo.value === "SD" ? "#FFFF64" :
                               // cellInfo.value === "HQ" ? "#2EB22E" :
                               // ["L9", "L14"].includes(cellInfo.value) ? "#346beb" :
                               // ["x", "H"].includes(cellInfo.value)  ? "#00D897" :
                               // holidays.includes(cellInfo.value) ? "#ed0c0c" :
                               null
            },
        })}/>


      </div>
    )
  }
}
