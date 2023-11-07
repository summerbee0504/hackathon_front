import { Box } from '@mui/material';
import BasicCard from './BasicCard';
import { Article } from '../interfaces/Article';

const ListItems = (props: { items: Article[] }) => {
  return (
    <Box justifyContent="flex-start" sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>
      {props.items.map((item: Article, index) => (
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
            comment_count={item.comment_count}
            like_count={item.like_count}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ListItems;
