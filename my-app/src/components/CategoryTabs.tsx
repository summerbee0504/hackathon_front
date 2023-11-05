import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

export default function CategoryTabs(props: { setKey: (newKey: number) => void }) {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setKey(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="記事" value={1} />
        <Tab label="本" value={2} />
        <Tab label="動画" value={3} />
        <Tab label="その他" value={4} />
      </Tabs>
    </Box>
  );
}
