import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { ListLoadingAnimation } from '../../../components/Skeltons';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  curriculum: string;
}

export const CurriculumList = (props: {
  setId: (newId: string) => void;
  setSearchBy: (newSearchBy: string) => void;
  setToolbarTitle: (newToolbarTitle: string) => void;
}) => {
  const url = 'https://hackathon-2ilru5g5ba-uc.a.run.app/posts/curriculums/all';

  const { data: reqestedData, loading } = useGetRequest(url);
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    if (reqestedData! && Array.isArray(reqestedData)) {
      setData(reqestedData);
    }
  }, [reqestedData]);

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
