import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { AuthContext } from '../../../authenticaion/AuthContext';
import ListItems from '../../Dashboard/components/ListItems';
import { Article } from '../../../interfaces/Article';
import { FixedArticle } from '../../../interfaces/FixedArticle';

const convertToJapanTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const japanTime = new Date(date.getTime() + 9 * 3600000);
  return japanTime;
};

const LikedPosts = (props: { categoryKey: number }) => {
  const { currentUser } = useContext(AuthContext);
  const url = 'http://localhost:8080/posts/likes?id=' + currentUser?.uid;
  const { data: responseData } = useGetRequest(url);
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    if (Array.isArray(responseData)) {
      setData(responseData);
    }
  }, [responseData]);

  const timezoneSetData = data.map((item: Article) => {
    return {
      ...item,
      created_at: convertToJapanTime(item.created_at),
      updated_at: convertToJapanTime(item.updated_at)
    };
  });

  const articles = timezoneSetData.filter((item: FixedArticle) => item.category === 'ブログ記事');
  const books = timezoneSetData.filter((item: FixedArticle) => item.category === '本');
  const videos = timezoneSetData.filter((item: FixedArticle) => item.category === '動画');
  const others = timezoneSetData.filter((item: FixedArticle) => item.category === 'その他');

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Typography variant="h5">Liked Posts</Typography>
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

export default LikedPosts;
