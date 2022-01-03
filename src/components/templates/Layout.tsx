import { urlToHttpOptions } from 'url';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';

import { MARKETS, INDUSTRY_33, VALUE_OR_GROWTH, IS_PRICE_SHIFTABLE } from '../../constants/seacrh-filters';
import SearchAutocomplete from '../organisms/SearchAutocomplete';
import PlainAccordion from '../primitives/Accordion';

const drawerWidth = 240;

function ResponsiveDrawer(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <SearchAutocomplete
          initiallyFetchedData={props.initiallyFetchedData}
          setStockCodeName={(name: string, code: string) =>
            props.dispatch({ type: 'SET_STOCK_CODE_NAME', payload: { name, code } })
          }
        />
      </List>
      <Divider />
      <List>
        <ListItem>
          <PlainAccordion name={MARKETS.name}>
            <FormGroup>
              {MARKETS.options.map((market) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) =>
                        event.target.checked
                          ? props.dispatch({
                              type: 'SET_MARKET',
                              payload: market,
                            })
                          : props.dispatch({
                              type: 'DELETE_MARKET',
                              payload: market,
                            })
                      }
                    />
                  }
                  label={market}
                  key={market}
                />
              ))}
            </FormGroup>
          </PlainAccordion>
        </ListItem>
        <ListItem>
          <PlainAccordion name={INDUSTRY_33.name}>
            <FormGroup>
              {INDUSTRY_33.options.map((industry) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) =>
                        event.target.checked
                          ? props.dispatch({
                              type: 'SET_INDUSTRY',
                              payload: industry,
                            })
                          : props.dispatch({
                              type: 'DELETE_INDUSTRY',
                              payload: industry,
                            })
                      }
                    />
                  }
                  label={industry}
                  key={industry}
                />
              ))}
            </FormGroup>
          </PlainAccordion>
        </ListItem>
        <ListItem>
          <PlainAccordion name={VALUE_OR_GROWTH.name}>
            <RadioGroup defaultValue="None">
              {VALUE_OR_GROWTH.options.map((option) => (
                <FormControlLabel
                  control={
                    <Radio
                      onChange={() => {
                        props.dispatch({
                          type: 'SET_VALUEORGROWTH',
                          payload: option.value,
                        });
                      }}
                    />
                  }
                  label={option.label}
                  value={option.label}
                  key={option.label}
                />
              ))}
            </RadioGroup>
          </PlainAccordion>
        </ListItem>
        <ListItem>
          <PlainAccordion name={IS_PRICE_SHIFTABLE.name}>
            <RadioGroup defaultValue="None">
              {IS_PRICE_SHIFTABLE.options.map((option) => (
                <FormControlLabel
                  control={
                    <Radio
                      onChange={() => {
                        props.dispatch({
                          type: 'SET_IS_PRICESHIFTABLE',
                          payload: option.value,
                        });
                      }}
                    />
                  }
                  label={option.label}
                  value={option.label}
                  key={option.label}
                />
              ))}
            </RadioGroup>
          </PlainAccordion>
        </ListItem>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        {props.children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
