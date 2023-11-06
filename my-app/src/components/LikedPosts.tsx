import { Box, Toolbar } from '@mui/material';
import BasicCard from './BasicCard';
import { useContext } from 'react';
import YouTube from 'react-youtube';
import { useGetRequest } from './useGetRequest';
import { AuthContext } from './AuthContext';

interface Article {
  id: string;
  category: string;
  user: string;
  title: string;
  url: string;
  content: string;
  curriculum: string;
  created_at: string;
  updated_at: string;
}

const convertToJapanTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const japanTime = new Date(date.getTime() + 9 * 3600000);
  console.log('japanTime: ', japanTime);
  return japanTime;
};

const LikedPosts = (props: { categoryKey: number }) => {
  const { currentUser } = useContext(AuthContext);
  const url = 'http://localhost:8080/posts/likes?id=' + currentUser?.uid;
  const { data } = useGetRequest(url);

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

  const Articles = () => {
    return (
      <Box justifyContent="flex-start" sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>
        {articles.map((item: Article, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              m: 1
            }}
          >
            <BasicCard
              id={item.id}
              title={item.title}
              url={item.url}
              content={item.content}
              user={item.user}
              updated_at={item.updated_at}
            />
          </Box>
        ))}
      </Box>
    );
  };

  const Books = () => {
    return (
      <Box justifyContent="flex-start" sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>
        {books.map((item: Article, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              m: 1
            }}
          >
            <BasicCard
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              content={item.content}
              user={item.user}
              updated_at={item.updated_at}
            />
          </Box>
        ))}
      </Box>
    );
  };

  const opts = {
    height: '200',
    width: '300',
    playerVars: {
      autoplay: 0
    }
  };

  const Videos = () => {
    return (
      <Box justifyContent="flex-start" sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>
        {videos.map((item: Article, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              m: 1
            }}
          >
            <YouTube videoId={item.content} opts={opts} loading="lazy" />
          </Box>
        ))}
      </Box>
    );
  };

  const Others = () => {
    return (
      <Box justifyContent="flex-start" sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>
        {others.map((item: Article, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              m: 1
            }}
          >
            <BasicCard
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              content={item.content}
              user={item.user}
              updated_at={item.updated_at}
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px', width: '100%' }}>
      <Toolbar />
      <Box sx={{ justifyContent: 'center', width: '100%' }}>
        {(() => {
          switch (props.categoryKey) {
            case 1:
              return <Articles />;
            case 2:
              return <Books />;
            case 3:
              return <Videos />;
            case 4:
              return <Others />;
            default:
              return null;
          }
        })()}
      </Box>
    </Box>
  );
};

export default LikedPosts;
