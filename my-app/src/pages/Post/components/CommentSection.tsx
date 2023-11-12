import * as React from 'react';
import List from '@mui/material/List';
import { Comment } from '../../../interfaces/Commet';
import { useEffect } from 'react';
import CommentCard from './CommentCard';
import PostComment from './PostComment';
import { convertToJapanTime } from '../../../functions/convertToJapanTime';

export default function CommentSection(props: { id: string }) {
  const [data, setData] = React.useState<Comment[]>([]);
  const [commented, setCommented] = React.useState<boolean>(false);
  const [deleted, setDeleted] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://hackathon-2ilru5g5ba-uc.a.run.app/post/comments?id=${props.id}`);
      try {
        const jsonData = await data.json();
        if (Array.isArray(jsonData)) {
          const timezoneSetData = jsonData.map((item: Comment) => ({
            ...item,
            created_at: convertToJapanTime(item.created_at).toLocaleString(),
            updated_at: convertToJapanTime(item.updated_at).toLocaleString()
          }));
          setData(timezoneSetData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setCommented(false);
    setDeleted(false);
  }, [commented, props.id, deleted]);

  return (
    <List sx={{ width: '100%', maxWidth: 360, borderRadius: '5px' }}>
      {data.map((item, index) => (
        <CommentCard comment={item} key={index} setDeleted={setDeleted} />
      ))}
      <PostComment setCommented={setCommented} />
    </List>
  );
}
