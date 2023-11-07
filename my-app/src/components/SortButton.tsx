import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function SortButton(props: { setSortBy: Function; sortBy: string }) {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newSortBy: string) => {
    props.setSortBy(newSortBy);
  };

  return (
    <ToggleButtonGroup color="primary" value={props.sortBy} exclusive onChange={handleChange} aria-label="Platform">
      <ToggleButton value="created">作成日時</ToggleButton>
      <ToggleButton value="updated">更新日時</ToggleButton>
    </ToggleButtonGroup>
  );
}
