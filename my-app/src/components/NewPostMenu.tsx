import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import MovieIcon from '@mui/icons-material/Movie';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: <ArticleIcon />, name: 'Blog', category: '1' },
  { icon: <MenuBookIcon />, name: 'Book', category: '2' },
  { icon: <MovieIcon />, name: 'Video', category: '3' },
  { icon: <HistoryEduIcon />, name: 'Other', category: '4' }
];

export default function NewPostMenu() {
  const navigate = useNavigate();
  const handleActionClick = (category: string) => {
    navigate('/new', { state: { category: category } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.category)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
