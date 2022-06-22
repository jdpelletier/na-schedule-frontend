import React from 'react';
// import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import { format } from "date-fns"

import { IndividualDownload } from "../IndividualDownload/IndividualDownload"
import { UploadFile } from "../UploadFile/UploadFile"
import './SideBar.css'
import Today from '../../static/schedToday.PNG'
import Night from '../../static/schedNight.PNG'
import Day from '../../static/schedDay.PNG'
import Leave from '../../static/schedLeave.PNG'
import Pay from '../../static/schedPay.PNG'
import Hol from '../../static/schedHol.PNG'

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
      <ButtonGroup vertical>
        <IndividualDownload names={names} />
        <Button variant="secondary" onClick={() => setPage('links')}>Useful Links</Button>
        <Button variant="secondary" onClick={() => setPage('nightlogs')}>Nightlog</Button>
        <Button variant="secondary" onClick={() => setPage('submitnightlog')}>Submit Nightlog</Button>
      </ButtonGroup>
      <div className="container">
        <div className="item">
          <Card>
            <Card.Body>
              <Card.Title className="f3" style={{ height: '1.5rem' }}>Staff Tonight</Card.Title>
              <Card.Text>
                {staff}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="item">
          <Card>
            <Card.Body>
              <Card.Title className="f3" style={{ height: '1.5rem' }}>Schedule Key</Card.Title>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item><img src={Today} alt="today" style={{width:"20px", height:"20px"}} /> Today</ListGroup.Item>
                  <ListGroup.Item><img src={Night} alt="night" style={{width:"20px", height:"20px"}} /> Night Shift</ListGroup.Item>
                  <ListGroup.Item><img src={Day} alt="day" style={{width:"20px", height:"20px"}} />Day Shift</ListGroup.Item>
                  <ListGroup.Item><img src={Leave} alt="leave" style={{width:"20px", height:"20px"}} />Leave</ListGroup.Item>
                  <ListGroup.Item><img src={Pay} alt="pay" style={{width:"20px", height:"20px"}} />Pay Period</ListGroup.Item>
                  <ListGroup.Item><img src={Hol} alt="holiday" style={{width:"20px", height:"20px"}} />Holiday</ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
