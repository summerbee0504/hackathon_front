import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { usePostRequest } from '../hooks/usePostRequest';

export default function CardMenu(props: {
  id: string;
  requestUrl: string;
  handleEdit?: () => void;
  edit: boolean;
  isOwner?: boolean;
  setDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { makePostRequest } = usePostRequest();

  const handleDelete = () => {
    const requestUrl = props.requestUrl + props.id;

    const postRequest = JSON.stringify({ id: props.id });

    makePostRequest(requestUrl, postRequest);
    props.setDeleted!(true);
  };

  return (
    <Box>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {props.edit && props.isOwner ? <MenuItem onClick={props.handleEdit}>Edit</MenuItem> : null}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
