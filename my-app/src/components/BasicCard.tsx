import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';
import { CustomTheme } from './MuiTheme';
import { Link } from 'react-router-dom';
import { Badge, Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteMenu from './DeleteMenu';
import { AuthContext } from './AuthContext';
import { useGetRequest } from './useGetRequest';
import { useContext, useEffect, useState } from 'react';
import { usePostRequest } from './usePostRequest';
import { Article } from '../interfaces/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinesEllipsis from 'react-lines-ellipsis';

export default function BasicCard(props: {
  id: string;
  title: string;
  url: string;
  content: string;
  user: string;
  updated_at: string;
  comment_count: number;
  like_count: number;
}) {
  const { currentUser } = useContext(AuthContext);
  const { loading, data } = useGetRequest('http://localhost:8080/posts/likes?id=' + currentUser?.uid);
  const { makePostRequest } = usePostRequest();
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    if (data) {
      const likedPosts = data.map((item: Article) => item.id);
      const ifLiked = likedPosts.includes(props.id);
      setLiked(ifLiked);
    }
  }, [data, props.id]);

  if (loading || data === undefined) {
    return <CircularProgress />;
  }

  const handleLike = () => {
    if (!liked) {
      makePostRequest(
        'http://localhost:8080/post/like',
        JSON.stringify({ post_id: props.id, user_id: currentUser?.uid })
      );
    } else {
      makePostRequest(
        'http://localhost:8080/post/unlike',
        JSON.stringify({ post_id: props.id, user_id: currentUser?.uid })
      );
    }
    setLiked(!liked);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Card sx={{ width: 350, height: 210 }} elevation={4}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                最終更新：{props.updated_at}
              </Typography>
            </Box>
            <Box>
              <DeleteMenu id={props.id} />
            </Box>
          </Box>
          <Typography variant="h6" component="div">
            <LinesEllipsis text={props.title} maxLine={1} ellipsis="..." trimRight basedOn="letters" />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.user}
          </Typography>
          <Typography variant="body2">
            <LinesEllipsis text={props.content} maxLine={1} ellipsis="..." trimRight basedOn="letters" />
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
                  <Badge badgeContent={props.comment_count} color="secondary" sx={{ backgroundColor: 'transparent' }}>
                    <CommentIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              {!liked ? (
                <Tooltip title="Like">
                  <IconButton onClick={handleLike}>
                    <Badge color="secondary">
                      <FavoriteBorderIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Unlike">
                  <IconButton onClick={handleLike}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
