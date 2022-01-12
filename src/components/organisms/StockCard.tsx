import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import NoteInput from '../primitives/NoteInput';

const AccordionSummary = styled(MuiAccordionSummary)(() => ({ margin: '0 0' }));

const StockCard = memo(function StockCard(props: any) {
  return (
    <Card variant="outlined" sx={{ height: '100%', overflowY: 'scroll' }}>
      <Accordion>
        <AccordionSummary
          sx={{ height: '150px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ padding: '0 16px' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {props.name}({props.code})
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              市場：{props.market}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              規模区分：{props.group}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              33業種：{props.industry33}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ padding: '0 16px' }}>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              バリュー・グロース：{props.valueOrGrowth || 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              価格転嫁：{props.isProductPriceShiftable || 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              親会社：{props.parentCompany || 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              系列：{props.groupCompany || 'ー'}
            </Typography>
            <Box display="flex" alignItems="flex-end">
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                株主：
              </Typography>
              <NoteInput value="俺" />
            </Box>
            {/* <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              株主：{props.shareHolders.length > 0 ? props.shareHolders.length : 'ー'}
            </Typography> */}
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              提携会社：{props.partnerCompanies.length > 0 ? props.partnerCompanies.length : 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              出資先：{props.investingCompanies.length > 0 ? props.investingCompanies.length : 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              テーマ：{props.themes.length > 0 ? props.themes.length : 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              プロダクト分離：{props.productCategories.length > 0 ? props.productCateegories.length : 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              プロダクト用途：{props.productUsecases.length > 0 ? props.productUsecases.length : 'ー'}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.market === nextProps.market &&
    prevProps.group === nextProps.group &&
    prevProps.industry_33 === nextProps.industry_33 &&
    prevProps.valueOrGrowth === nextProps.valueOrGrowth &&
    prevProps.isProductPriceShiftable === nextProps.isProductPriceShiftable
  );
}

export default StockCard;
