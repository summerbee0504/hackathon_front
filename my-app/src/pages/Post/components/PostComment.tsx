import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { usePostRequest } from '../../../hooks/usePostRequest';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../authenticaion/AuthContext';
import { useContext, useState } from 'react';
import { Status } from '../../../components/Status';

const PostComment = (props: { setCommented: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const { success, error, loading, makePostRequest } = usePostRequest();
  const [comment, setComment] = useState<string>('');

  const submit = async () => {
    const url = 'http://hackathon-2ilru5g5ba-uc.a.run.app/post/comment';
    const request = JSON.stringify({
      post_id: id,
      user_id: currentUser?.uid,
      content: comment
    });
    const data = await makePostRequest(url, request);
    console.log('data', data);
    if (data) {
      setComment('');
      props.setCommented(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', width: '100%', ml: '10px' }}
    >
      <TextField
        id="comment"
        placeholder="Add comment"
        multiline
        value={comment}
        onChange={handleChange}
        sx={{ width: '85%' }}
        size="small"
      />
      <IconButton onClick={submit}>
        <SendIcon />
      </IconButton>
      <Status success={success} loading={loading} error={error} />
    </Box>
  );
};

export default PostComment;
