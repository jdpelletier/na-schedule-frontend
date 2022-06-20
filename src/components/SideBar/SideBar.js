import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { format } from "date-fns"

import { IndividualDownload } from "../IndividualDownload/IndividualDownload"
import { UploadFile } from "../UploadFile/UploadFile"
import './SideBar.css'

export const SideBar = ({ isSignedIn, onRouteChange, onNewSchedule, names, setPage, staff }) => {


  // const [staffTest, setStaffTest] = useState([])
  //
  // useEffect(() => {
  //   const day = format(new Date(), 'yyy-MM-d')
  //   fetch("https://vm-appserver.keck.hawaii.edu/api/telSchedule?cmd=getNightStaff&date=" + day)
  //     .then(response => response.json())
  //     .then(data => {
  //       setStaffTest([...data])
  //     });
  // }, [])

  return (
    <div classname="sidebarWrap">
      <div className="upload">
        <UploadFile isSignedIn={isSignedIn} onRouteChange={onRouteChange} onNewSchedule={onNewSchedule}/>
      </div>
      <div className="container">
        <div className="item">
          <IndividualDownload names={names} />
        </div>
        <div className="item">
          <Button variant="secondary" onClick={() => setPage('nightlog')}>Nightlog</Button>
        </div>
        <div className="item">
          <Button variant="secondary" onClick={() => setPage('links')}>Useful Links</Button>
        </div>
        <div className="item">
          <Card>
            <Card.Body>
              <Card.Title className="f3" style={{ height: '3.5rem' }}>Staff Tonight</Card.Title>
              <Card.Text>
                {staff}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
