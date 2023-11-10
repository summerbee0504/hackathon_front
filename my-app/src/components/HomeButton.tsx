import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const HomeButton = (props: { title: string }) => {
  const handleClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ display: 'flex', justifyContent: 'flex-start', mt: '10px' }}
    >
      <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit" component="div">
          {props.title}
        </Typography>
        <Tooltip title="Home" placement="bottom">
          <IconButton onClick={handleClick}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
