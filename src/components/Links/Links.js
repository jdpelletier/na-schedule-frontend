import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';

import NavMenu from "../NavMenu/NavMenu"
import Fills from '../../static/Fills.pdf'
import NaHoursandCodes from '../../static/NightAttendantHoursandCodes.pdf'

export const Links = ({setPage}) => {

  const openLink = (link) => {
    window.open(link, "_blank")
  }

  return(
    <div>
      <NavMenu page={"links"} setPage={setPage} />
      <h1>Useful Links</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header><div className="dark-blue f4">Procedures</div></Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.keck.hawaii.edu/obsupport/weather/evacuation_procedures_v3.html")}>
                Foul Weather Recovery and Evacuation
              </Nav.Link>
              <Nav.Link className="dark-blue f5" href={Fills} target="_blank">
                Instrument Fill Chart
              </Nav.Link>
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.keck.hawaii.edu/draw/CARA/EE/114/114-05-03.pdf")}>
                Power Outage Recovery
              </Nav.Link>
              <Nav.Link className="dark-blue f5" href={NaHoursandCodes} target="_blank">
                NA Effort Report Hours and Codes
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><div className="dark-blue f4">Cameras</div></Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.keck.hawaii.edu/twiki/bin/view/Operations/FacilityCameras")}>
                Facility Cameras
              </Nav.Link>
              <Nav.Link className="dark-blue f5" onClick={() => openLink("http://mkwc.ifa.hawaii.edu/current/cams/")}>
                Maunakea Weather Center
              </Nav.Link>
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.gemini.edu/sciops/telescopes-and-sites/weather/mauna-kea/cloud-cam/quickflics.html")}>
                Gemini Cloud Cams
              </Nav.Link>
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.youtube.com/watch?v=eH90mZnmgD4&ab_channel=%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E5%AE%87%E5%AE%99%E9%83%A8")}>
                Subaru Asahi
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header><div className="dark-blue f4">Schedules</div></Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.keck.hawaii.edu/observing/keckSchedule/keckSchedule.php")}>
                Telescope Schedule
              </Nav.Link>
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www.keck.hawaii.edu/observing/pcalendar/dailySched.php")}>
                Duty Schedule
              </Nav.Link>
              <Nav.Link className="dark-blue f5" onClick={() => openLink("https://www2.keck.hawaii.edu/observing/obs_support_coord/currentOAsched.htm")}>
                OA Schedule
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )

}
