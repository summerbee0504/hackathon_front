import styled from '@emotion/styled';
import { TextField, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../authenticaion/AuthContext';
import { usePostRequest } from '../../../hooks/usePostRequest';
import '../../../styles/NewPostForm.css';
import CurriculumSelecter from '../../../components/CurriculumSelecter';
import { useLocation } from 'react-router-dom';
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

const NewPostForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [curriculumId, setCurriculumId] = useState('');
  const { state } = useLocation();
  const category = state?.category;

  const { success, loading, error, makePostRequest } = usePostRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      alert('Please fill out all required fields');
      return;
    }

    const postRequest = JSON.stringify({
      category_id: Number(category),
      user_id: currentUser?.uid,
      title: title,
      url: url,
      content: content,
      curriculum_id: curriculumId
    });

    const requestUrl = 'https://hackathon-2ilru5g5ba-uc.a.run.app/post/new';

    const data = await makePostRequest(requestUrl, postRequest);

    if (!error && !loading) {
      setTimeout(() => {
        window.location.href = '/edit/' + data.post_id;
      }, 1000);
    }
  };

  return (
    <form className="NewPostForm" onSubmit={handleSubmit}>
      <Status success={success} loading={loading} error={error} />
      <div className="form">
        <ValidationTextField
          label="Title"
          required
          variant="filled"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: '80%' }}
          size="small"
        />
        <CurriculumSelecter setCurriculumId={setCurriculumId} curriculumId={curriculumId} />
        {category === '3' ? (
          <ValidationTextField
            label="動画のID"
            required
            placeholder="https://youtu.be/xxxxx?.....のxxxxx部分"
            variant="filled"
            margin="normal"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ width: '80%' }}
            size="small"
          />
        ) : (
          <ValidationTextField
            label="URL"
            variant="filled"
            margin="normal"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ width: '80%' }}
            size="small"
          />
        )}
        <ValidationTextField
          label="Content"
          variant="filled"
          margin="normal"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ width: '80%' }}
          size="small"
        />
        <Button className="submit-button" variant="contained" sx={{ mt: 2, width: '80%' }} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default NewPostForm;
