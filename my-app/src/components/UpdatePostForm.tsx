import styled from '@emotion/styled';
import { TextField, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { usePostRequest } from './usePostRequest';
import '../styles/NewPostForm.css';
import CurriculumSelecter from './CurriculumSelecter';
import { useGetRequest } from './useGetRequest';
import { useParams } from 'react-router-dom';

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

const UpdatePostForm = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const getUrl = `http://localhost:8080/post?id=${id}`;
  const { data: getData } = useGetRequest(getUrl);
  const [title, setTitle] = useState(getData.title || '');
  const [url, setUrl] = useState(getData.url || '');
  const [content, setContent] = useState(getData.content || '');
  const [curriculumId, setCurriculumId] = useState(getData.curriculum_id || '');
  const [category, setCategory] = useState(getData.category_id || '');

  useEffect(() => {
    if (getData && Object.keys(getData).length > 0) {
      setTitle(getData.title);
      setUrl(getData.url);
      setContent(getData.content);
      setCurriculumId(getData.curriculum_id);
      setCategory(getData.category_id);
    }
  }, [getData]);

  const { data, loading, error, makePostRequest } = usePostRequest();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      alert('Please fill out all required fields');
      return;
    }

    const postRequest = JSON.stringify({
      category_id: Number(category),
      post_id: id,
      user_id: currentUser?.uid,
      title: title,
      url: url,
      content: content,
      curriculum_id: curriculumId
    });

    const requestUrl = `http://localhost:8080/post/update?id=${id}`;

    makePostRequest(requestUrl, postRequest);

    if (!error && !loading) {
      setTimeout(() => {
        window.location.href = '/post/' + id;
      }, 1000);
    }
  };

  const Status = () => {
    return (
      <div className="status">
        {loading && <p>Loading...</p>}
        {error && <p>Error: Please try again later.</p>}
        {data && <p>Success!</p>}
        {!loading && !error && data.length === 0 && <div></div>}
      </div>
    );
  };

  return (
    <form className="NewPostForm" onSubmit={handleSubmit}>
      <Status />
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

export default UpdatePostForm;
