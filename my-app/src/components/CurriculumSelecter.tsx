import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetRequest } from '../hooks/useGetRequest';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

interface Curriculum {
  id: string;
  curriculum: string;
}

export default function CurriculumSelecter(props: { setCurriculumId: Function; curriculumId: string }) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setCurriculumId(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Curriculum[]>([]);

  const url = 'http://localhost:8080/posts/curriculums/all';

  const { data: responseData } = useGetRequest(url);

  useEffect(() => {
    if (Array.isArray(responseData)) {
      setData(responseData);
    }
  }, [responseData]);

  return (
    <Box sx={{ width: '80%', margin: '0 auto' }}>
      <FormControl variant="filled" sx={{ width: '100%', mt: '7px' }}>
        <InputLabel id="demo-simple-select-filled-label">Curriculum</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          open={open}
          value={props.curriculumId}
          onChange={handleChange}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          size="small"
          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // スクロール可能なメニュー
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((curriculum: Curriculum) => (
            <MenuItem key={curriculum.id} value={curriculum.id} sx={{ height: '35px' }}>
              <Typography variant="body1">{curriculum.curriculum}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
