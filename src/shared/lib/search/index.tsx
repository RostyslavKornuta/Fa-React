import { InputAdornment, TextField, type SxProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  styles?: SxProps;
}

export const Search = ({
  value,
  onChange,
  placeholder = "Search",
  styles = {},
}: SearchProps) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      size="small"
      onChange={(event) => onChange(event.target.value)}
      sx={styles}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
