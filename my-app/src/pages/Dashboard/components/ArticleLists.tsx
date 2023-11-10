import { Box, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetRequest } from '../../../hooks/useGetRequest';
import ListItems from './ListItems';
import { Article } from '../../../interfaces/Article';
import SortButton from '../../../components/SortButton';
import { convertToJapanTime } from '../../../functions/convertToJapanTime';
import { FixedArticle } from '../../../interfaces/FixedArticle';

const ArticleLists = (props: { categoryKey: number; id: string; searchBy: string }) => {
  const [url, setUrl] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [articles, setArticles] = useState<FixedArticle[]>([]);
  const [books, setBooks] = useState<FixedArticle[]>([]);
  const [videos, setVideos] = useState<FixedArticle[]>([]);
  const [others, setOthers] = useState<FixedArticle[]>([]);

  useEffect(() => {
    switch (props.searchBy) {
      case 'tag':
        setUrl(`http://localhost:8080/posts/tags?id=${props.id}`);
        break;
      case 'curriculum':
        setUrl(`http://localhost:8080/posts/curriculums?id=${props.id}`);
        break;
      default:
        setUrl('http://localhost:8080/posts/date');
        break;
    }
  }, [props.searchBy, props.id]);

  const { data: fetchedData } = useGetRequest(url);

  useEffect(() => {
    if (Array.isArray(fetchedData)) {
      console.log(fetchedData);
      const timezoneSetData = fetchedData.map((item: Article) => ({
        ...item,
        created_at: convertToJapanTime(item.created_at),
        updated_at: convertToJapanTime(item.updated_at)
      }));

      const filteredArticles = timezoneSetData.filter((item: FixedArticle) => item.category === 'ブログ記事');
      const filteredBooks = timezoneSetData.filter((item: FixedArticle) => item.category === '本');
      const filteredVideos = timezoneSetData.filter((item: FixedArticle) => item.category === '動画');
      const filteredOthers = timezoneSetData.filter((item: FixedArticle) => item.category === 'その他');

      const sortFunc = (a: FixedArticle, b: FixedArticle) => {
        if (a.updated_at > b.updated_at) {
          return 1;
        } else if (a.updated_at < b.updated_at) {
          return -1;
        } else {
          return 0;
        }
      };
      const updatedDescArticles = [...filteredArticles].sort(sortFunc);
      const updatedDescBooks = [...filteredBooks].sort(sortFunc);
      const updatedDescVideos = [...filteredVideos].sort(sortFunc);
      const updatedDescOthers = [...filteredOthers].sort(sortFunc);

      if (sortBy === 'created') {
        setArticles(filteredArticles);
        setBooks(filteredBooks);
        setVideos(filteredVideos);
        setOthers(filteredOthers);
      } else {
        setArticles(updatedDescArticles);
        setBooks(updatedDescBooks);
        setVideos(updatedDescVideos);
        setOthers(updatedDescOthers);
      }
    }
  }, [fetchedData, sortBy]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '128px', width: '100%' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <SortButton setSortBy={setSortBy} sortBy={sortBy} />
      </Toolbar>
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
              return <p>No items to display</p>;
          }
        })()}
      </Box>
    </Box>
  );
};

export default ArticleLists;
