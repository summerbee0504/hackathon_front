import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';
import { CustomTheme } from '../styles/MuiTheme';
import { Link } from 'react-router-dom';
import { Badge, Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import CardMenu from './CardMenu';
import { AuthContext } from '../authenticaion/AuthContext';
import { useGetRequest } from '../hooks/useGetRequest';
import { useContext, useEffect, useState } from 'react';
import { usePostRequest } from '../hooks/usePostRequest';
import { Article } from '../interfaces/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinesEllipsis from 'react-lines-ellipsis';
import { FixedArticle } from '../interfaces/FixedArticle';

export default function BasicCard(props: { item: FixedArticle }) {
  const { currentUser } = useContext(AuthContext);
  const { loading, data } = useGetRequest(
    'https://hackathon-2ilru5g5ba-uc.a.run.app/posts/likes?id=' + currentUser?.uid
  );
  const { makePostRequest } = usePostRequest();
  const [liked, setLiked] = useState<boolean | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  console.log(props.item);

  useEffect(() => {
    if (currentUser?.uid === props.item.user_id) {
      setIsOwner(true);
      console.log(isOwner);
    } else {
      setIsOwner(false);
      console.log(isOwner);
      console.log(currentUser?.uid);
      console.log(props.item.user_id);
    }
  }, [props.item.user_id, currentUser?.uid, isOwner]);

  useEffect(() => {
    if (data) {
      const likedPosts = data.map((item: Article) => item.id);
      const ifLiked = likedPosts.includes(props.item.id);
      setLiked(ifLiked);
    }
  }, [data, props.item.id]);

  if (loading || data === undefined) {
    return <CircularProgress />;
  }

  const handleLike = () => {
    if (!liked) {
      makePostRequest(
        'https://hackathon-2ilru5g5ba-uc.a.run.app/post/like',
        JSON.stringify({ post_id: props.item.id, user_id: currentUser?.uid })
      );
    } else {
      makePostRequest(
        'https://hackathon-2ilru5g5ba-uc.a.run.app/post/unlike',
        JSON.stringify({ post_id: props.item.id, user_id: currentUser?.uid })
      );
    }
    setLiked(!liked);
  };

  const handleEdit = () => {
    setTimeout(() => {
      window.location.href = '/edit/' + props.item.id;
    }, 1000);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Card sx={{ width: 350, height: 210 }} elevation={4}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                最終更新：{props.item.updated_at.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <CardMenu
                id={props.item.id}
                handleEdit={handleEdit}
                requestUrl="https://hackathon-2ilru5g5ba-uc.a.run.app/post/delete?id="
                edit={true}
                isOwner={isOwner}
              />
            </Box>
          </Box>
          <Typography variant="h6" component="div">
            <LinesEllipsis text={props.item.title} maxLine={1} ellipsis="..." trimRight basedOn="letters" />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.item.user}
          </Typography>
          <Typography variant="body2" component="div">
            <LinesEllipsis text={props.item.content} maxLine={1} ellipsis="..." trimRight basedOn="letters" />
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Box>
              <Button size="small" component={Link} to={`/post/${props.item.id}`}>
                Read
              </Button>
            </Box>
            <Box>
              <Badge
                badgeContent={props.item.comment_count}
                color="secondary"
                sx={{ backgroundColor: 'transparent', mr: '2px' }}
              >
                <CommentIcon />
              </Badge>
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
