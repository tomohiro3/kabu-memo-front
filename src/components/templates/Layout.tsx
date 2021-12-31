import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

import SearchField from '../organisms/SearchField';
import PlainAccordion from '../primitives/Accordion';

const drawerWidth = 240;
const filters = [
  {
    name: '市場',
    values: ['東1', '東2', '東マ', 'JQ'],
  },
  {
    name: '33業種',
    values: [
      '水産農林業',
      '鉱業',
      '建設業',
      '食料品',
      '繊維製品',
      'パルプ紙',
      '化学',
      '医薬品',
      '石油石炭製品',
      'ゴム製品',
      'ガラス土石製品',
      '鉄鋼',
      '非鉄金属',
      '金属製品',
      '機械',
      '電気機器',
      '輸送用機器',
      '精密機器',
      'その他製品',
      '電気ガス業',
      '陸運業',
      '海運業',
      '空運業',
      '倉庫運輸関連業',
      '情報通信業',
      '卸売業',
      '小売業',
      '銀行業',
      '証券商品先物取引',
      '保険業',
      'その他金融業',
      '不動産業',
      'サービス業',
    ],
  },
  {
    name: 'バリュー・グロース',
    values: ['バリュー', 'グロース'],
  },
  {
    name: '価格転嫁',
    values: ['良', '悪'],
  },
];

function ResponsiveDrawer(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <SearchField />
      </List>
      <Divider />
      <List>
        {filters.map((filterItem) => (
          <ListItem key={filterItem.name}>
            <PlainAccordion name={filterItem.name}>
              <FormGroup>
                {filterItem.values.map((value) => (
                  <FormControlLabel control={<Checkbox />} label={value} key={value} />
                ))}
              </FormGroup>
            </PlainAccordion>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {props.children}
    </Box>
  );
}

export default ResponsiveDrawer;
