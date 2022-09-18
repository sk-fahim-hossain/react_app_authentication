import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleEmailBlur = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value)
    setPassword('')
  }

  const handleRegistered = (event) => {
    console.log(event.target.checked)
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }




    setValidated(true);
    setError('')

    if (registered) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail('')
          setPassword('')
        })
        .catch(error => {
          console.log(error)
          setError(error.message)
        })
    }
    else{
      signInWithEmailAndPassword(auth, email, password)
      .then(result=>{
        const user = result.user;
        console.log(user)
      })
      .catch(error=>{
        console.log(error)
        setError(error.message)
      })
    }

    event.preventDefault()
  }

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="mt-3 mx-auto w-50 ">
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <h3 className="text-primary">Please {registered ? 'Login' : 'Register!!'}</h3>
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleRegistered} type="checkbox" label="Already Registered?" />
        </Form.Group>

        <Button variant="primary" type="submit">
          {registered ? 'Login' : 'Register'}
        </Button>
        <p>{error}</p>
      </Form>
    </div>
  );
}

export default App;
