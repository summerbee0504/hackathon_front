import { Box, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetRequest } from './useGetRequest';
import ListItems from './ListItems';
import { Article } from '../interfaces/Article';
import SortButton from './SortButton';

const convertToJapanTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const japanTime = new Date(date.getTime() + 9 * 3600000);
  return japanTime.toLocaleString();
};

const ArticleLists = (props: { categoryKey: number; id: string; searchBy: string }) => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    console.log('props.id:', props.id);
    console.log('props.searchBy: ', props.searchBy);

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
      const timezoneSetData = fetchedData.map((item: Article) => ({
        ...item,
        created_at: convertToJapanTime(item.created_at),
        updated_at: convertToJapanTime(item.updated_at)
      }));
      setData(timezoneSetData);
      console.log('timezoneSetData: ', timezoneSetData);
    }
  }, [fetchedData]);

  const filteredArticles = data.filter((item: Article) => item.category === 'ブログ記事');
  const filteredBooks = data.filter((item: Article) => item.category === '本');
  const filteredVideos = data.filter((item: Article) => item.category === '動画');
  const filteredOthers = data.filter((item: Article) => item.category === 'その他');

  const [articles, setArticles] = useState<Article[]>(filteredArticles);
  const [books, setBooks] = useState<Article[]>(filteredBooks);
  const [videos, setVideos] = useState<Article[]>(filteredVideos);
  const [others, setOthers] = useState<Article[]>(filteredOthers);

  const updatedDescArticles = filteredArticles.sort((a: Article, b: Article) => (a.updated_at < b.updated_at ? 1 : -1));
  const updatedDescBooks = filteredBooks.sort((a: Article, b: Article) => (a.updated_at < b.updated_at ? 1 : -1));
  const updatedDescVideos = filteredVideos.sort((a: Article, b: Article) => (a.updated_at < b.updated_at ? 1 : -1));
  const updatedDescOthers = filteredOthers.sort((a: Article, b: Article) => (a.updated_at < b.updated_at ? 1 : -1));

  const [sortBy, setSortBy] = useState('created');

  useEffect(() => {
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
  }, [sortBy, props.searchBy, props.id, data]);

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
