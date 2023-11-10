import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { ListLoadingAnimation } from '../../../components/Skeltons';

interface Tag {
  id: string;
  tag: string;
}

export const TagsList = (props: {
  setId: (newId: string) => void;
  setSearchBy: (newSearchBy: string) => void;
  setToolbarTitle: (newToolbarTitle: string) => void;
}) => {
  const url = 'http://localhost:8080/posts/tags/all';

  const { data, loading } = useGetRequest(url);

  const handleClick = (id: string, tag: string) => {
    props.setId(id);
    props.setSearchBy('tag');
    props.setToolbarTitle(tag);
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
        data.map((item: Tag) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => handleClick(item.id, item.tag)}>
              <ListItemText primary={item.tag} />
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );
};
