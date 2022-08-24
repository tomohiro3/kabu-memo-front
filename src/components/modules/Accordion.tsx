import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Accordion = styled((props: any) => <MuiAccordion disableGutters elevation={0} {...props} />)(() => ({
  width: '100%',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({ padding: `0 ${theme.spacing(2)}` }));

export default function PlainAccordion(props: any) {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </>
  );
}
