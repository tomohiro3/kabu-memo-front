import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

type Props = {
  value: string;
  //   setValue: () => void;
  //   add: () => void;
  //   remove: () => void;
};

export default function NoteInput(props: Props) {
  return (
    <Box flex={1} display="flex" alignItems="center">
      <TextField
        variant="outlined"
        fullWidth
        inputProps={{ style: { padding: '0 6px' } }}
        value={props.value}
        onChange={() => console.log('changed')}
      />
      <IconButton size="small" onClick={() => console.log('Added')}>
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton size="small" onClick={() => console.log('Removed')}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}
