import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LogTable } from "./LogTable"
import './Nightlog.css'
import NavMenu from "../NavMenu/NavMenu"

export const Nightlog = ({setPage, logtoview, setLogtoview, setEditNL, ip, port}) => {

  const [logs, setLogs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [viewlog, setViewlog] = useState(false);


  const cols = (nightlog) => {
    const COLUMNS = [];
    const first = nightlog[0];

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
    fetch(`${ip}:${port}/nightlogs`)
      .then(response => response.json())
      .then(data => {
        setLogs([...data])
        setColumns([...cols(data)])
      });
  }, [ip, port])

  const openLog = (lid) => {
    let opts = {
      'LogID': lid,
    }
    fetch(`${ip}:${port}/viewnightlog`, {
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
    setLogtoview({})
    setEditNL(false)
    setViewlog(false)
  }

  const del = () => {
    let opts = {
      'LogID': logtoview.LogID,
    }
    fetch(`${ip}:${port}/deletenightlog`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts)
    }).then(response => response.json())
      .then(setViewlog(false))
      .then(window.location.reload(false))
      .then(setPage("nightlogs"))
    }

  const edit = () => {
      setEditNL(true)
      setPage("submitnightlog")
      };


  if (viewlog === true){
    return(
      <div className="nlog">
        <NavMenu page={"nightlogs"} setPage={setPage} setViewlog={setViewlog} setLogtoview={setLogtoview} setEditNL={setEditNL} />
        <div className="nlogView">
          <Card className="bg-black-50 text-white nlogView" >
            <Card.Body>
              <Button variant="secondary" onClick={back}>Back</Button>
              <Button variant="secondary" onClick={del}>Delete</Button>
              <Button variant="secondary" onClick={edit}>Edit</Button>
              <Card.Title className="f3" style={{ height: '2rem' }}>{logtoview.Topic}</Card.Title>
              <Card.Subtitle className="mb-2">
                 Submitted by: {logtoview.Name} on {logtoview.Date}<br/>
                {logtoview.Keyword}
              </Card.Subtitle>
              <Card.Text className="f4">
                {logtoview.Details}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }else{
    return(
      <div>
        <NavMenu setPage={setPage} setEditNL={setEditNL} />
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
