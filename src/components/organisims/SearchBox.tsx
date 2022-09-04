import SearchIcon from '@mui/icons-material/Search';

type Props = Pick<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'> &
  Pick<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

// todo
// ref要る？
// style
export default function SearchBox(props: Props) {
  const { onSubmit, ...rest } = props;
  return (
    <form action="" role="search" onSubmit={onSubmit}>
      <input aria-label="Type search keywords" type="search" {...rest} />
      <button aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  );
}
