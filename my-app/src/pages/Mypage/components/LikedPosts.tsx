import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
  const [articles, setArticles] = useState<FixedArticle[]>([]);
  const [books, setBooks] = useState<FixedArticle[]>([]);
  const [videos, setVideos] = useState<FixedArticle[]>([]);
  const [others, setOthers] = useState<FixedArticle[]>([]);
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://hackathon-2ilru5g5ba-uc.a.run.app/posts/likes?id=${currentUser?.uid}`);
      try {
        const jsonData = await data.json();
        if (Array.isArray(jsonData)) {
          const timezoneSetData = jsonData.map((item: Article) => ({
            ...item,
            created_at: convertToJapanTime(item.created_at),
            updated_at: convertToJapanTime(item.updated_at)
          }));
          const filteredArticles = timezoneSetData.filter((item: FixedArticle) => item.category === 'ブログ記事');
          const filteredBooks = timezoneSetData.filter((item: FixedArticle) => item.category === '本');
          const filteredVideos = timezoneSetData.filter((item: FixedArticle) => item.category === '動画');
          const filteredOthers = timezoneSetData.filter((item: FixedArticle) => item.category === 'その他');
          setArticles(filteredArticles);
          setBooks(filteredBooks);
          setVideos(filteredVideos);
          setOthers(filteredOthers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setDeleted(false);
  }, [currentUser?.uid, deleted]);

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Typography variant="h5">Liked Posts</Typography>
      <Box sx={{ justifyContent: 'center', width: '100%' }}>
        {(() => {
          switch (props.categoryKey) {
            case 1:
              return <ListItems items={articles} setDeleted={setDeleted} />;
            case 2:
              return <ListItems items={books} setDeleted={setDeleted} />;
            case 3:
              return <ListItems items={videos} setDeleted={setDeleted} />;
            case 4:
              return <ListItems items={others} setDeleted={setDeleted} />;
            default:
              return null;
          }
        })()}
      </Box>
    </Box>
  );
};

export default LikedPosts;
