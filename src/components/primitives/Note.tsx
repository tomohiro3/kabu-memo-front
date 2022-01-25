import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

type NoteProps = {
  name: string;
  values: string[];
  add: (v: string) => void;
  remove: (v: string) => void;
};

export default function Note(props: NoteProps) {
  const { name, values, ...others } = props;
  const plusOneValues = Array.from(values);
  plusOneValues.push('');

  return (
    <Box display="flex" alignItems="flex-end">
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        {name}：
      </Typography>
      {plusOneValues.map((value, i) => (
        <NoteInput key={value + i} value={value} {...others} />
      ))}
    </Box>
  );
}

type NoteInputProps = Omit<NoteProps, 'name' | 'values'> & { value: string };

function NoteInput(props: NoteInputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <Box flex={1} display="flex" alignItems="center" justifyContent="space-between">
      <TextField
        variant="outlined"
        fullWidth
        inputProps={{ style: { padding: '0 6px', minWidth: '50px' } }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ marginRight: '5px' }}
      />
      <IconButton size="small" onClick={() => props.add(value)}>
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton size="small" onClick={() => props.remove(value)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}
