import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const IndividualDownload = ({names, ip, port}) => {

  const [popupOpen, setPopupOpen] = useState(false);
  const openModal = () => setPopupOpen(true);
  const closeModal = () => setPopupOpen(false);

  const individualDownload = (name) => {
    fetch(
      `${ip}:${port}/get-employee-schedule`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "employee": name
          })
      }
    ).then(response => {
      const filename =  name + '.csv';
      response.blob()
       .then(blob => {
         let url = window.URL.createObjectURL(blob);
         let a = document.createElement('a');
         a.href = url;
         a.download = filename;
         a.click();
       })
     })
    closeModal()
  }

  return (
    <div>
      <Button variant="secondary" size="sm" onClick={openModal}>Download Individual Schedule</Button>
      <Modal show={popupOpen} onHide={closeModal}>
        <Modal.Title>Choose a schedule to download</Modal.Title>
        <Modal.Body>{names.map(name => {
                      return(<Button variant="secondary" value={name} onClick={(e) => {
                        individualDownload(name, e)
                      }}>{name}</Button>)
                    })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
