import { Box, Toolbar, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useGetRequest } from './useGetRequest';
import { AuthContext } from './AuthContext';
import ListItems from './ListItems';
import { Article } from '../interfaces/Article';

const convertToJapanTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const japanTime = new Date(date.getTime() + 9 * 3600000);
  console.log('japanTime: ', japanTime);
  return japanTime;
};

const MyPosts = (props: { categoryKey: number }) => {
  const { currentUser } = useContext(AuthContext);
  const url = 'http://localhost:8080/posts/user?id=' + currentUser?.uid;
  const { data: responseData } = useGetRequest(url);
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    if (Array.isArray(responseData)) {
      setData(responseData);
      console.log('responseData: ', responseData);
    }
  }, [responseData]);

  const timezoneSetData = data.map((item: Article) => {
    return {
      ...item,
      created_at: convertToJapanTime(item.created_at).toLocaleString(),
      updated_at: convertToJapanTime(item.updated_at).toLocaleString()
    };
  });

  const articles = timezoneSetData.filter((item: Article) => item.category === 'ブログ記事');
  const books = timezoneSetData.filter((item: Article) => item.category === '本');
  const videos = timezoneSetData.filter((item: Article) => item.category === '動画');
  const others = timezoneSetData.filter((item: Article) => item.category === 'その他');

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Typography variant="h5">My Posts</Typography>
      <Box sx={{ justifyContent: 'center', width: '100%' }}>
        {(() => {
          switch (props.categoryKey) {
            case 1:
              return <ListItems items={articles} />;
            case 2:
              return <ListItems items={books} />;
            case 3:
              return <ListItems items={videos} />;
            case 4:
              return <ListItems items={others} />;
            default:
              return null;
          }
        })()}
      </Box>
    </Box>
  );
};

export default MyPosts;
