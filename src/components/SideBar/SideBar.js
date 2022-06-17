import React from 'react';
import Button from 'react-bootstrap/Button';
import { IndividualDownload } from "../IndividualDownload/IndividualDownload"
import DateSelector from "../DateSelector/DateSelector"
import { UploadFile } from "../UploadFile/UploadFile"
import './SideBar.css'

export const SideBar = ({ dateRange, setDateRange, isSignedIn, onRouteChange, onNewSchedule, names, setPage }) => {

  return (
    <div>
      <div className="upload">
        <UploadFile isSignedIn={isSignedIn} onRouteChange={onRouteChange} onNewSchedule={onNewSchedule}/>
      </div>
      <div className="container">
        <div className="item">
          <DateSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        <div className="item">
          <IndividualDownload names={names} />
        </div>
        <div className="item">
          <Button variant="secondary" onClick={() => setPage('nightlog')}>Nightlog</Button>
        </div>
        <div className="item">
          <Button variant="secondary" onClick={() => setPage('training')}>Training Documents</Button>
        </div>
        <div className="item">
          <Button variant="secondary" onClick={() => setPage('cameras')}>Cameras</Button>
        </div>
      </div>
    </div>
  );
}
