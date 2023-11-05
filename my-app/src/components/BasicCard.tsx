import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';
import { CustomTheme } from './MuiTheme';
import { Link } from 'react-router-dom';
import { Box, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteMenu from './DeleteMenu';
export default function BasicCard(props: {
  id: string;
  title: string;
  content: string;
  user: string;
  updated_at: string;
}) {
  const maxLength = 20;
  return (
    <ThemeProvider theme={CustomTheme}>
      <Card sx={{ width: 350, height: 210 }} elevation={4}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                更新日時：{props.updated_at}
              </Typography>
            </Box>
            <Box>
              <DeleteMenu />
            </Box>
          </Box>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.user}
          </Typography>
          <Typography variant="body2">
            {props.content.length > maxLength ? `${props.content.substring(0, maxLength)}...` : props.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Box>
              <Button size="small" component={Link} to={`/post/${props.id}`}>
                Read
              </Button>
            </Box>
            <Box>
              <Tooltip title="Show Comment">
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Like">
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
