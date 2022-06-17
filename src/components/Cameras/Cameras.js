import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavMenu from "../NavMenu/NavMenu"

export const Cameras = ({setPage}) => {

  const openLink = (link) => {
    window.open(link, "_blank")
  }

  return(
    <div>
      <NavMenu page={"cameras"} setPage={setPage} />
      <h1>Facility and Maunakea Cameras</h1>
      <Nav className="flex-column">
        <Nav.Link className="dark-blue f3" onClick={() => openLink("https://www.keck.hawaii.edu/twiki/bin/view/Operations/FacilityCameras")}>
          Facility Cameras
        </Nav.Link>
        <Nav.Link className="dark-blue f3" onClick={() => openLink("http://mkwc.ifa.hawaii.edu/current/cams/")}>
          Maunakea Weather Center
        </Nav.Link>
        <Nav.Link className="dark-blue f3" onClick={() => openLink("https://www.gemini.edu/sciops/telescopes-and-sites/weather/mauna-kea/cloud-cam/quickflics.html")}>
          Gemini Cloud Cams
        </Nav.Link>
        <Nav.Link className="dark-blue f3" onClick={() => openLink("https://www.youtube.com/watch?v=eH90mZnmgD4&ab_channel=%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E5%AE%87%E5%AE%99%E9%83%A8")}>
          Subaru Asahi
        </Nav.Link>
      </Nav>
    </div>
  )

}
