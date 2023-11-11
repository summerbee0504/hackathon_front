import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../../authenticaion/AuthContext';
import '../../../styles/SignupForm.css';
import { usePostRequest } from '../../../hooks/usePostRequest';
import { Status } from '../../../components/Status';

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
    padding: '4px !important'
  }
});

const SignupForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState(currentUser?.displayName || '');
  const [term, setTerm] = useState('');
  const [bio, setBio] = useState('');

  const { success, loading, error, makePostRequest } = usePostRequest();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || term === undefined) {
      alert('Please fill out all required fields');
      return;
    }

    const postRequest = JSON.stringify({
      id: currentUser?.uid,
      name,
      term: parseInt(term),
      bio,
      permisssion_id: 2,
      image: currentUser?.photoURL
    });

    const url = 'https://hackathon-2ilru5g5ba-uc.a.run.app/signup'; //変える

    const data = await makePostRequest(url, postRequest);
    if (data && Object.keys(data).length !== 0) {
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    }
  };

  return (
    <form onSubmit={submit}>
      <Box>
        <Status success={success} loading={loading} error={error} />
        <ValidationTextField
          label="Name"
          required
          variant="filled"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mr: 2 }}
          autoComplete="off"
        />
        <ValidationTextField
          label="Term"
          required
          variant="filled"
          margin="normal"
          value={term}
          type="number"
          onChange={(e) => setTerm(e.target.value)}
          autoComplete="off"
        />
        <Box>
          <ValidationTextField
            label="Bio"
            variant="filled"
            margin="normal"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            sx={{ width: '100%' }}
            autoComplete="off"
          />
        </Box>
        <Button variant="contained" sx={{ mt: 2, width: '100%' }} type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
