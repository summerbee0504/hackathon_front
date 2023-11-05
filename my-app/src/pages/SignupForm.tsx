import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/SignupForm.css';
import { usePostRequest } from '../components/usePostRequest';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important' // override inline-style
  }
});

const SignupForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState(currentUser?.displayName || '');
  const [term, setTerm] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const email: string = currentUser?.email || '';

  const { data, loading, error, makePostRequest } = usePostRequest();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || term === undefined) {
      alert('Please fill out all required fields');
      return;
    }

    const postRequest = JSON.stringify({
      id: currentUser?.uid,
      name,
      term: parseInt(term),
      bio
    });

    const url = 'http://localhost:8080/signup'; //変える

    makePostRequest(url, postRequest);
    if (data.length !== 0) {
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    }
  };

  const Status = () => {
    return (
      <div className="status">
        {loading && <p>Loading...</p>}
        {error && <p>Error: Please try again later.</p>}
        {data.length !== 0 && <p>Success!</p>}
        {!loading && !error && data.length === 0 && <div></div>}
      </div>
    );
  };
  return (
    <form className="Signup-form" onSubmit={submit}>
      <Status />
      <div className="form">
        <div className="form-left">
          <ValidationTextField
            label="Name"
            required
            variant="filled"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ValidationTextField
            label="Email"
            required
            variant="filled"
            margin="normal"
            value={email}
            inputProps={{ readOnly: true }}
          />
          <ValidationTextField
            label="Term"
            required
            variant="filled"
            margin="normal"
            value={term}
            type="number"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="form-right">
          <ValidationTextField
            label="Bio"
            variant="filled"
            margin="normal"
            multiline
            rows={5}
            maxRows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button className="submit-button" variant="contained" sx={{ mt: 2 }} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;