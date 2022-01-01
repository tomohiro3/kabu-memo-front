import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function StockCard(props: any) {
  return (
    <Box height="180px">
      <Card variant="outlined" sx={{ height: '100%', overflowY: 'scroll' }}>
        <CardHeader title={`${props.name}(${props.code})`} />
        <CardContent sx={{ padding: '0 16px' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            市場：{props.market}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            33業種：{props.industry_33}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
