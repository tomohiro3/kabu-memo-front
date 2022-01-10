import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

const StockCard = memo(function StockCard(props: any) {
  return (
    <Box height="150px">
      <Card variant="outlined" sx={{ height: '100%', overflowY: 'scroll' }}>
        <CardHeader title={`${props.name}(${props.code})`} />
        <CardContent sx={{ padding: '0 16px' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            市場：{props.market}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            規模区分：{props.group}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            33業種：{props.industry_33}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            バリュー・グロース：{props.valueOrGrowth}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            価格転嫁：{props.isPriceShiftable}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.market === nextProps.market &&
    prevProps.group === nextProps.group &&
    prevProps.industry_33 === nextProps.industry_33 &&
    prevProps.valueOrGrowth === nextProps.valueOrGrowth &&
    prevProps.isPriceShiftable === nextProps.isPriceShiftable
  );
}

export default StockCard;
