import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavMenu from "../NavMenu/NavMenu"

import Pdf from '../../static/NightAttendantHoursandCodes.pdf'

export const Training = ({setPage}) => {

  const openLink = (link) => {
    window.open(link, "_blank")
  }

  return(
    <div>
      <NavMenu page={"training"} setPage={setPage} />
      <h1>Training and Informational Documents</h1>
      <Nav className="flex-column">
        <Nav.Link className="dark-blue f3" onClick={() => openLink("https://www.keck.hawaii.edu/draw/CARA/EE/114/114-05-03.pdf")}>
          Power Outage Recovery
        </Nav.Link>
        <Nav.Link className="dark-blue f3" href={Pdf} target="_blank">
          NA Effort Report Hours and Codes
        </Nav.Link>
      </Nav>
    </div>
  )

}
