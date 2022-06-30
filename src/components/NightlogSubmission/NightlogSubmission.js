import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavMenu from "../NavMenu/NavMenu"
import './NightlogSubmission.css';

const NightlogSubmission = ({setPage, logtoview, editNL, setEditNL, ip, port}) => {

  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [keyword, setKeyword] = useState("");
  const today = new Date();
  const todaystr = today.toISOString().substr(0,10)
  const [date, setDate] = useState();
  const [logid, setLogid] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const closeModal = () => setPopupOpen(false);
  const [missingitems, setMissingItems] = useState([]);

  useEffect(() => {
    fetch(`${ip}:${port}/nightlogs`)
      .then(response => response.json())
      .then(data => {
        if(editNL===false){
          setDate(todaystr)
          if(data.length>0){
            const last = data[data.length - 1]
            setLogid(parseInt(last.LogID) + 1)
          }
        }else{
          setLogid(parseInt(logtoview.LogID))
          setName(logtoview.Name)
          setKeyword(logtoview.Keyword)
          setTopic(logtoview.Topic)
          setDate(logtoview.Date)
          setDetails(logtoview.Details)
        }
      });
  }, [editNL, ip, port, logtoview, todaystr])

  const cancel = () => {
    if(editNL===true){
      let opts = {
        'LogID': logtoview.LogID,
        'Date': logtoview.Date,
        'Keyword': logtoview.Keyword,
        'Topic': logtoview.Topic,
        'Name': logtoview.Name,
        'Details': logtoview.Details
      }
      fetch(`${ip}:${port}/editnightlogsubmition`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts)
      }).then(response => response.json())
        .then(()=>{
          setEditNL(false)
          setPage("nightlogs")})

    }else{
      setPage("nightlogs")
    }
  }

  const submit = (e) => {
    e.preventDefault()
    let opts = {
      'LogID': logid,
      'Date': date,
      'Keyword': keyword,
      'Topic': topic,
      'Name': name,
      'Details': details
    }
    const missing = []
    for(var key in opts){
      if(opts[key] === ""){
        missing.push(key + " ")
      }
    }
    if (missing.length === 0){
      if (editNL===true){
        fetch(`${ip}:${port}/editnightlogsubmition`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(opts)
        }).then(response => response.json())
          .then(setPage("nightlogs"))
        }else{
          fetch(`${ip}:${port}/nightlogsubmition`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(opts)
          }).then(response => response.json())
            .then(()=>{
              setEditNL(false)
              setPage("nightlogs")})
        }
      }else{
        setMissingItems(missing)
        setPopupOpen(true)
      }
    }

  return(
    <>
      <NavMenu page={"submitnightlog"} setPage={setPage} setEditNL={setEditNL} />
      <div className="formwrapper">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="topic">
              <Form.Label>Topic:</Form.Label>
              <Form.Control type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="date">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="Date" defaultValue={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="keyword">
              <Form.Label>Select a Keyword:</Form.Label>
              <Form.Select name="keywords" id="keywords" value={keyword} onChange={(e) => setKeyword(e.target.value)}>
                <option value="" selected disabled hidden></option>
                <option value="Telescope">Telescope</option>
                <option value="Instrument">Instrument</option>
                <option value="Dome">Dome</option>
                <option value="Facility">Facility</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Details:</Form.Label>
            <Form.Control as="textarea" rows="10" cols="100" value={details} onChange={(e) => setDetails(e.target.value)} />
          </Form.Group>
          <Button variant="secondary" onClick={submit}>Submit</Button>
          <Button variant="secondary" onClick={cancel}>Cancel</Button>
        </Form>

        <Modal show={popupOpen} onHide={closeModal}>
          <Modal.Body>Missing Sections<br/>Please add {missingitems.map((item) => item)}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default NightlogSubmission
