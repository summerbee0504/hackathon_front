import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Drawer, Divider, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { useState } from 'react';
import { CurriculumsList } from './CurriculumsList';
import { TagsList } from './TagsList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Toolbar from '@mui/material/Toolbar';

const DashboardToolbar = (props: {
  setId: (newId: string) => void;
  setSearchBy: (newSearchBy: string) => void;
  setToolbarTitle: (newToolbarTitle: string) => void;
}) => {
  const drawerWidth = 240;
  const [openCategories, setOpenCategories] = useState(true);
  const [openTags, setOpenTags] = useState(true);

  const handleClickCategories = () => {
    setOpenCategories(!openCategories);
  };

  const handleClickTags = () => {
    setOpenTags(!openTags);
  };

  const handleClickLogo = () => {
    props.setId('');
    props.setSearchBy('');
    props.setToolbarTitle('All Posts');
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src="./logo.png" alt="logo" className="logo" height="40px" onClick={handleClickLogo} />
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton onClick={handleClickCategories}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <CurriculumsList
            setId={props.setId}
            setSearchBy={props.setSearchBy}
            setToolbarTitle={props.setToolbarTitle}
          />
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClickTags}>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
          {openTags ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTags} timeout="auto" unmountOnExit>
          <TagsList setId={props.setId} setSearchBy={props.setSearchBy} setToolbarTitle={props.setToolbarTitle} />
        </Collapse>
      </List>
    </Drawer>
  );
};

export default DashboardToolbar;
