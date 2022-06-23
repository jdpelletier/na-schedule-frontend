import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const UploadFile = ({ onRouteChange, isSignedIn, onNewSchedule }) => {

  const [selectedFile, setSelectedFile] = useState();


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = () => {
    console.log('submitting...')
  	const formData = new FormData();

  	formData.append('file', selectedFile);

  	fetch(
  		'http://localhost:5000/update_schedule',
  		{
  			method: 'POST',
        body: formData
  	  }
    ).then(response => response.json())
     .then(data => onNewSchedule(data));
  }

  if(isSignedIn) {
  	return(
      <div>
        <Card>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Update schedule:</Form.Label>
            <Form.Control type="file" name="file" size="sm" onChange={changeHandler} />
          </Form.Group>
          <Button onClick={handleSubmission}>Submit</Button>
          <Button variant="secondary" onClick={() => onRouteChange('signout')}>Sign Out</Button>
        </Card>
      </div>
  	)
  }else{
    return(
      <div className='tr'>
        <span className=' tr f5 link dim black underline pointer' onClick={() => onRouteChange('signin')}>Admin</span>
      </div>
    )
  }
}


//TODO add onClick={() => onRouteChange('signin')}  back to admin button after testing
