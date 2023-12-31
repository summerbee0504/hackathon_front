import { Box, Paper, Typography, Tooltip, IconButton, Badge, Divider, Avatar, Button } from '@mui/material';
import { Article } from '../../../interfaces/Article';
import { AuthContext } from '../../../authenticaion/AuthContext';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { usePostRequest } from '../../../hooks/usePostRequest';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ReactMarkdown from 'react-markdown';

const PostContent = (props: { id: string; post: Article }) => {
  const { currentUser } = useContext(AuthContext);
  const likedataRequestUrl = 'https://hackathon-2ilru5g5ba-uc.a.run.app/posts/likes?id=' + currentUser?.uid;
  const { data: likedData } = useGetRequest(likedataRequestUrl);
  const [liked, setLiked] = useState<boolean | null>(null);
  const { makePostRequest } = usePostRequest();
  const userImage = props.post.user_image ? props.post.user_image : './defaultUserImage.png';
  const Owner = props.post.user_id === currentUser?.uid;
  const [likecount, setLikecount] = useState<number>(0);

  useEffect(() => {
    if (props.post.like_count) {
      setLikecount(props.post.like_count);
    }
  }, [props.post.like_count]);

  useEffect(() => {
    if (Array.isArray(likedData) && props.id) {
      const likedPosts = likedData.map((item: Article) => item.id);
      const ifLiked = likedPosts.includes(props.id);
      setLiked(ifLiked);
    }
  }, [likedData, props.id]);

  const handleLike = () => {
    if (!liked) {
      makePostRequest(
        'https://hackathon-2ilru5g5ba-uc.a.run.app/post/like',
        JSON.stringify({ post_id: props.id, user_id: currentUser?.uid })
      );
      setLikecount(likecount + 1);
    } else {
      makePostRequest(
        'https://hackathon-2ilru5g5ba-uc.a.run.app/post/unlike',
        JSON.stringify({ post_id: props.id, user_id: currentUser?.uid })
      );
      setLikecount(likecount - 1);
    }
    setLiked(!liked);
  };

  return (
    <Box
      component={Paper}
      width="50%"
      minHeight="80%"
      sx={{
        display: 'flex',
        alignContent: 'flex-start',
        flexDirection: 'column',
        p: '20px',
        justifyContent: 'space-between'
      }}
    >
      <Box
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          mb: '20px'
        }}
      >
        <Box
          width="100%"
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            p: '20px'
          }}
        >
          <Box>
            <Avatar src={userImage} sx={{ width: '50px', height: '50px', mb: '20px' }} />
            <Typography variant="h5" component="h1" gutterBottom>
              {props.post.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.post.user} posted this at {props.post.created_at}
            </Typography>
          </Box>
          <Box>
            {!liked ? (
              <Tooltip title="Like">
                <IconButton onClick={handleLike}>
                  <Badge color="secondary" badgeContent={likecount}>
                    <FavoriteBorderIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Unlike">
                <IconButton onClick={handleLike}>
                  <Badge color="secondary" badgeContent={likecount}>
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            {Owner ? (
              <Tooltip title="Edit">
                <IconButton component={Link} to={`/edit/${props.id}`}>
                  <Badge color="secondary">
                    <EditIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        </Box>

        <Box
          width="100%"
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'column',
            pr: '20px',
            pl: '20px'
          }}
        >
          <Typography variant="body1" gutterBottom>
            {props.post.curriculum}
          </Typography>
          <Typography variant="body1" gutterBottom>
            最終更新: {props.post.updated_at}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Divider variant="middle" sx={{ width: '100%', mb: '20px' }} />
        </Box>
        <Box
          width="100%"
          sx={{
            pr: '20px',
            pl: '20px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {props.post.content ? <ReactMarkdown>{props.post.content}</ReactMarkdown> : null}
        </Box>
      </Box>
      {props.post.category === '動画' ? (
        <YouTube videoId={props.post.url} opts={{ width: '100%' }} />
      ) : props.post.url ? (
        <Button variant="contained" sx={{ width: '100%' }} href={props.post.url}>
          Visit the link
        </Button>
      ) : null}
    </Box>
  );
};

export default PostContent;
