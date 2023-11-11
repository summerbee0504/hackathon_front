import styled from '@emotion/styled';
import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePostRequest } from '../../../hooks/usePostRequest';
import '../../../styles/UpdatePostForm.css';
import CurriculumSelecter from '../../../components/CurriculumSelecter';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { useParams } from 'react-router-dom';
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

const UpdatePostForm = () => {
  const { id } = useParams();
  const getUrl = `http://curriculum-4-yuria-fujii-2ilru5g5ba-uc.a.run.app/post?id=${id}`;
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

  const { success, loading, error, makePostRequest } = usePostRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      alert('Please fill out all required fields');
      return;
    }

    const postRequest = JSON.stringify({
      id: id,
      title: title,
      url: url,
      content: content,
      curriculum_id: curriculumId
    });

    console.log('postRequest', postRequest);

    const requestUrl = `http://curriculum-4-yuria-fujii-2ilru5g5ba-uc.a.run.app/post/update?id=${id}`;

    const data = await makePostRequest(requestUrl, postRequest);
    if (data !== 0 && !error && !loading) {
      setTimeout(() => {
        window.location.href = '/post/' + id;
      }, 1000);
    }
  };

  return (
    <form className="UpdatePostForm" onSubmit={handleSubmit}>
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
          autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
          autoComplete="off"
        />
        <Button className="submit-button" variant="contained" sx={{ mt: 2, width: '80%' }} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UpdatePostForm;
