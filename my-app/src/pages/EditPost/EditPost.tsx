import { Box, Paper, Typography } from '@mui/material';
import UpdatePostForm from './components/UpdatePostForm';
import { HomeButton } from '../../components/HomeButton';

const EditPost = () => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="20px"
    >
      <Box
        component={Paper}
        width="60vw"
        height="80vh"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          pt: '30px',
          pb: '30px'
        }}
      >
        <HomeButton title={''} />
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Post
        </Typography>
        <UpdatePostForm />
      </Box>
    </Box>
  );
};

export default EditPost;
