import { Box, Typography } from '@mui/material';

const NewPost = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        New Post
      </Typography>
      <Typography variant="body1" gutterBottom>
        ここにフォームを作成する
      </Typography>
    </Box>
  );
};

export default NewPost;
