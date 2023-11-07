import { Box, Paper, Typography } from '@mui/material';
import NewPostForm from '../components/NewPostForm';

const NewPost = () => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component={Paper}
        width="60vw"
        height="80vh"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          New Post
        </Typography>
        <NewPostForm />
      </Box>
    </Box>
  );
};

export default NewPost;
