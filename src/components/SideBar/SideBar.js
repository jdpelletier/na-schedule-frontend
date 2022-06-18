import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { IndividualDownload } from "../IndividualDownload/IndividualDownload"
import { UploadFile } from "../UploadFile/UploadFile"
import './SideBar.css'

export const SideBar = ({ isSignedIn, onRouteChange, onNewSchedule, names, setPage, staff }) => {


  // const [staff, setStaff] = useState([])

  // useEffect(() => {
  //   const day = format(new Date(), 'yyy-MM-d')
  //   fetch("https://www.keck.hawaii.edu/software/db_api/telSchedule.php?cmd=getNightStaff&date=" + day)
  //     .then(response => response.json())
  //     .then(data => {
  //       setStaff([...data])
  //     });
  // }, [])

  return (
    <div>
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
              <Card.Title className="f3" style={{ height: '2rem' }}>Staff Tonight</Card.Title>
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
