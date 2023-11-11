import { Box } from '@mui/material';
import BasicCard from '../../../components/BasicCard';
import { FixedArticle } from '../../../interfaces/FixedArticle';

const ListItems = (props: { items: FixedArticle[]; setDeleted: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <Box justifyContent="flex-start" sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>
      {props.items.map((item: FixedArticle, index) => (
        <Box
          key={index}
          sx={{
            p: 1,
            m: 1
          }}
        >
          <BasicCard item={item} setDeleted={props.setDeleted} />
        </Box>
      ))}
    </Box>
  );
};

export default ListItems;
