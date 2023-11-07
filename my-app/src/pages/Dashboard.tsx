import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../styles/Dashboard.css';
import CategoryTabs from '../components/CategoryTabs';
import ArticleLists from '../components/ArticleLists';
import DashboardToolbar from '../components/DashboardToolbar';
import { useState } from 'react';
import AccountMenu from '../components/AccountMenu';
import NewPostMenu from '../components/NewPostMenu';

const drawerWidth = 240;

const Dashboard = () => {
  const [categoryKey, setCategoryKey] = useState(1);
  const [id, setId] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [toolbarTitle, setToolbarTitle] = useState('All Posts');

  const handleSetKey = (newKey: number) => {
    setCategoryKey(newKey);
  };

  const handleSetId = (newId: string) => {
    setId(newId);
  };

  const handleSetSearchBy = (newSearchBy: string) => {
    setSearchBy(newSearchBy);
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar sx={{ height: '80px' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box>
              <Typography variant="h6" noWrap component="div">
                {toolbarTitle}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <NewPostMenu />
              <AccountMenu />
            </Box>
          </Box>
        </Toolbar>
        <CategoryTabs setKey={handleSetKey} />
      </AppBar>
      <DashboardToolbar setId={handleSetId} setSearchBy={handleSetSearchBy} setToolbarTitle={setToolbarTitle} />
      <ArticleLists categoryKey={categoryKey} id={id} searchBy={searchBy} />
    </Box>
  );
};

export default Dashboard;
