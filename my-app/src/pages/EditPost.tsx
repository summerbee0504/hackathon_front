import { Box, Paper, Typography } from '@mui/material';
import UpdatePostForm from '../components/UpdatePostForm';

const EditPost = () => {
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
          Edit Post
        </Typography>
        <UpdatePostForm />
      </Box>
    </Box>
  );
};

export default EditPost;
