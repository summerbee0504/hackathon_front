import { ThemeProvider } from '@emotion/react';
import { Card, CardContent, Typography, CardActions, Button, ListItem, ListItemButton } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { CustomTheme } from '../styles/MuiTheme';

const ListLoadingAnimation = () => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Skeleton variant="text" width="100%" />
      </ListItemButton>
    </ListItem>
  );
};

const PostLoadingAnimation = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Card sx={{ width: 300 }} elevation={4}>
        <CardContent>
          <Typography variant="h5" component="div">
            <Skeleton variant="text" />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="body2">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Skeleton variant="text" />
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export { ListLoadingAnimation, PostLoadingAnimation };
