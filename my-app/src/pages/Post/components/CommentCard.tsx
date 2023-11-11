import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Box } from '@mui/material';
import React from 'react';
import { Comment } from '../../../interfaces/Commet';
import CardMenu from '../../../components/CardMenu';

const CommentCard = (props: { comment: Comment }) => {
  const deleteReqestUrl = `http://hackathon-2ilru5g5ba-uc.a.run.app/post/comment/delete?id=${props.comment.id}`;

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ width: '100%', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
          <ListItemAvatar sx={{ mt: '0' }}>
            <Avatar alt={props.comment.user} src={props.comment.user_image} />
          </ListItemAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: '0' }}>
              <ListItemText primary={props.comment.user} />
              <CardMenu id={props.comment.id} requestUrl={deleteReqestUrl} edit={false} />
            </Box>
            <ListItemText
              sx={{ width: '100%', mt: '0' }}
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {props.comment.created_at}
                  </Typography>
                  <Typography variant="body2" component="span">
                    {' - ' + props.comment.content}
                  </Typography>
                </React.Fragment>
              }
            />
          </Box>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommentCard;
