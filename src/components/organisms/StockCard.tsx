import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Dispatch, memo, useReducer, useState } from 'react';
import { StocksApiResponse } from '../../types/api';
import Note from '../primitives/Note';

type State = Omit<StocksApiResponse, 'code' | 'name' | 'market' | 'industry33' | 'group'>;

function reducer(state: State, action: any) {
  switch (action.type) {
    case 'SET_VALUEORGROWTH':
      return { ...state, valueOrGrowth: action.paylaod };
    case 'SET_IS_PRODUCTPRICE_SHIFTABLE':
      return { ...state, isProductPriceShiftable: action.paylaod };
    case 'SET_PARENT_COMPANY':
      return { ...state, parentCompany: action.paylaod };
    case 'SET_GROUP_COMPANY':
      return { ...state, groupCompany: action.paylaod };
    case 'SET_SHAREHOLDERS':
      return { ...state, shareHolders: [...state.shareHolders, action.payload] };
    case 'REMOVE_SHAREHOLDERS':
      return { ...state, shareHolders: state.shareHolders.filter((el) => el !== action.payload) };
    case 'SET_CUSTOMERS':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'REMOVE_CUSTOMERS':
      return { ...state, customers: state.customers.filter((el) => el !== action.payload) };
    case 'SET_PARTNER_COMPANIES':
      return { ...state, partnerCompanies: [...state.partnerCompanies, action.payload] };
    case 'REMOVE_PARTNER_COMPANIES':
      return { ...state, partnerCompanies: state.partnerCompanies.filter((el) => el !== action.payload) };
    case 'SET_INVESTING_COMPANIES':
      return { ...state, investingCompanies: [...state.investingCompanies, action.payload] };
    case 'REMOVE_INVESTING_COMPANIES':
      return { ...state, investingCompanies: state.investingCompanies.filter((el) => el !== action.payload) };
    case 'SET_THEMES':
      return { ...state, themes: [...state.themes, action.payload] };
    case 'REMOVE_THEMES':
      return { ...state, themes: state.themes.filter((el) => el !== action.payload) };
    case 'SET_PRODUCT_CATEGORIES':
      return { ...state, productCategories: [...state.productCategories, action.payload] };
    case 'REMOVE_PRODUCT_CATEGORIES':
      return { ...state, productCategories: state.productCategories.filter((el) => el !== action.payload) };
    case 'SET_PRODUCT_USECASES':
      return { ...state, productUsecases: [...state.productUsecases, action.payload] };
    case 'REMOVE_PRODUCT_USECASES':
      return { ...state, productUsecases: state.productUsecases.filter((el) => el !== action.payload) };
    default:
      return state;
  }
}

// やること
//上記stateをCardに渡す
// 表示モードと編集モードで別コンポネントを作る。（AcoordionDetails以下の部分）
const StockCard = memo(function StockCard(props: StocksApiResponse) {
  const { code, name, group, market, industry33, ...others } = props;
  const [state, dispatch] = useReducer(reducer, others);

  const [isEditMode, setIsEditMode] = useState(false);

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
              {name}({code})
            </Typography>
            <Button onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? '完了' : '編集'}</Button>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              市場：{market}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              規模区分：{group || 'ー'}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              33業種：{industry33}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ padding: '0 16px' }}>
            {isEditMode ? <EditModeSummary state={state} dispatch={dispatch} /> : <DisplayModeSummary state={state} />}
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

const AccordionSummary = styled(MuiAccordionSummary)(() => ({ margin: '0 0' }));

const DisplayModeSummary = ({ state }: { state: State }) => {
  return (
    <>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        バリュー・グロース：{state.valueOrGrowth || 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        価格転嫁：{state.isProductPriceShiftable || 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        親会社：{state.parentCompany || 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        系列：{state.groupCompany || 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        株主：{state.shareHolders.length > 0 ? state.shareHolders : 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        提携会社：{state.partnerCompanies.length > 0 ? state.partnerCompanies : 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        出資先：{state.investingCompanies.length > 0 ? state.investingCompanies : 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        テーマ：{state.themes.length > 0 ? state.themes : 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        プロダクト分離：{state.productCategories.length > 0 ? state.productCategories : 'ー'}
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        プロダクト用途：{state.productUsecases.length > 0 ? state.productUsecases : 'ー'}
      </Typography>
    </>
  );
};

const EditModeSummary = ({ state, dispatch }: { state: State; dispatch: Dispatch<any> }) => {
  return (
    <>
      <Note
        name="テスト"
        values={state.shareHolders}
        add={(v: string) => dispatch({ type: 'SET_SHAREHOLDERS', payload: v })}
        remove={(v: string) => dispatch({ type: 'REMOVE_SHAREHOLDERS', payload: v })}
      />
    </>
  );
};

export default StockCard;
