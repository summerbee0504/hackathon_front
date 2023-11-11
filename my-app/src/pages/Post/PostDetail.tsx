import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetRequest } from '../../hooks/useGetRequest';
import { Article } from '../../interfaces/Article';
import CommentSection from './components/CommentSection';
import PostContent from './components/PostContent';
import { useEffect, useState } from 'react';
import { HomeButton } from '../../components/HomeButton';

const PostDetail = () => {
  const { id } = useParams();
  const postdataRequestUrl = `http://curriculum-4-yuria-fujii-2ilru5g5ba-uc.a.run.app/post?id=${id}`;
  const { data: requestedData } = useGetRequest(postdataRequestUrl);

  const [data, setData] = useState<Article>({} as Article);

  useEffect(() => {
    if (requestedData) {
      setData(requestedData);
    }
  }, [requestedData]);

  return !data ? (
    <div>loading...</div>
  ) : (
    <Box width="100%" minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
      <HomeButton title="Post" />
      <Box
        width="100%"
        minHeight="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ p: '20px' }}
      >
        <PostContent id={id ? id : ''} post={data} />
        <Box
          width="40vw"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}
        >
          <CommentSection id={id ? id : ''} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetail;
