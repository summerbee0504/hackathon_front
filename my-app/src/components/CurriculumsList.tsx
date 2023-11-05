import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useGetRequest } from './useGetRequest';
import { ListLoadingAnimation } from './Skeltons';
import { Category } from '@mui/icons-material';

interface Category {
  id: string;
  curriculum: string;
}

export const CurriculumsList = (props: {
  setId: (newId: string) => void;
  setSearchBy: (newSearchBy: string) => void;
  setToolbarTitle: (newToolbarTitle: string) => void;
}) => {
  const url = 'http://localhost:8080/posts/curriculums/all';

  const { data, loading } = useGetRequest(url);

  const handleClick = (id: string, curriculum: string) => {
    props.setId(id);
    props.setSearchBy('curriculum');
    props.setToolbarTitle(curriculum);
  };

  return (
    <List>
      {loading ? (
        <>
          <ListLoadingAnimation />
          <ListLoadingAnimation />
          <ListLoadingAnimation />
        </>
      ) : (
        data.map((item: Category) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => handleClick(item.id, item.curriculum)}>
              <ListItemText primary={item.curriculum} />
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );
};
