import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetRequest } from '../components/useGetRequest';
import { Article } from '../interfaces/Article';
import CommentSection from '../components/CommentSection';
import PostContent from '../components/PostContent';
import { useEffect, useState } from 'react';

const PostDetail = () => {
  const { id } = useParams();
  const postdataRequestUrl = `http://localhost:8080/post?id=${id}`;
  const { data: requestedData } = useGetRequest(postdataRequestUrl);

  const [data, setData] = useState<Article>({} as Article);

  useEffect(() => {
    if (requestedData) {
      setData(requestedData);
    }
  }, [requestedData]);

  console.log(data);

  return !data ? (
    <div>loading...</div>
  ) : (
    <Box width="100%" minHeight="100vh" display="flex" justifyContent="center">
      <Box
        width="100%"
        minHeight="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ p: '20px', marginTop: '80px' }}
      >
        <PostContent id={id ? id : ''} post={data} />
        <Box
          width="40vw"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}
        >
          <CommentSection />
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetail;
