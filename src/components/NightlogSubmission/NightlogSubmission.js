import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './NightlogSubmission.css';

const NightlogSubmission = ({setSubmit, setLogs, logid}) => {

  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [keyword, setKeyword] = useState("");
  const today = new Date();
  const todaystr = today.toISOString().substr(0,10)
  const [date, setDate] = useState(todaystr);
  const [popupOpen, setPopupOpen] = useState(false);
  const closeModal = () => setPopupOpen(false);
  const [missingitems, setMissingItems] = useState([]);

  const cancel = () => {
    setSubmit(false)
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
      fetch('http://localhost:5000/nightlogsubmition', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts)
      }).then(response => response.json())
        .then(data => {
          if(data['success']===true){
            fetch("http://localhost:5000/nightlogs")
              .then(res => res.json())
              .then(dat => {
                setSubmit(false)
                setLogs([...dat])
              })
          }else{
            setSubmit(false)
          }
        })
      }else{
        setMissingItems(missing)
        setPopupOpen(true)
      }
    }

  return(
    <div className="formwrapper">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="topic">
            <Form.Label>Topic:</Form.Label>
            <Form.Control type="text" onChange={(e) => setTopic(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="date">
            <Form.Label>Date:</Form.Label>
            <Form.Control type="text" onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="keyword">
            <Form.Label>Select a Keyword:</Form.Label>
            <Form.Select name="keywords" id="keywords" onChange={(e) => setKeyword(e.target.value)}>
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
          <Form.Control as="textarea" rows="10" cols="100" onChange={(e) => setDetails(e.target.value)} />
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
  )
}

export default NightlogSubmission
