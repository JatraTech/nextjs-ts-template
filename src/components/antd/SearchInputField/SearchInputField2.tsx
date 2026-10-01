import { FOCUS_RING_CLASS } from "@/constants/a11y";
import InputComponent1 from "../Inputs/InputComponent1";
import {
  SEARCH_FIELD_BUTTON,
  SEARCH_FIELD_INNER,
  SEARCH_FIELD_INPUT,
  SEARCH_FIELD_OUTER_ACCENT,
} from "@/constants/searchFieldShell";
import { Search } from "lucide-react";

const SearchInputField2 = ({
  placeholder = "Search...",
  enterButton = null,
  onSearch = () => {},
  containerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  inputProps = {},
  buttonContent = null,
  showSearchIcon = true,
  onChange,
  onKeyDown,
  value,
  ...rest
}: {
  placeholder?: string;
  enterButton?: React.ReactNode;
  onSearch?: () => void;
  containerClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  inputProps?: Record<string, unknown>;
  buttonContent?: React.ReactNode;
  showSearchIcon?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  [key: string]: unknown;
}) => {
  return (
    <div className={`${SEARCH_FIELD_OUTER_ACCENT} ${containerClassName}`}>
      <InputComponent1
        name="search"
        inputContainerClassName={`${SEARCH_FIELD_INNER} ${inputContainerClassName}`}
        inputClassName={`${SEARCH_FIELD_INPUT} ${inputClassName}`}
        containerClassName="!w-full flex-1 min-w-0"
        bordered={false}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        {...inputProps}
        ariaLabel={
          typeof inputProps?.ariaLabel === "string" ? inputProps.ariaLabel : "Search"
        }
        {...rest}
      />
      <button
        type="button"
        aria-label="Search"
        className={`${SEARCH_FIELD_BUTTON} ${FOCUS_RING_CLASS} ${buttonClassName}`}
        onClick={onSearch}
      >
        {buttonContent ||
          (showSearchIcon ? (
            <Search className="w-5 h-5" strokeWidth={2} aria-hidden />
          ) : (
            enterButton
          ))}
      </button>
    </div>
  );
};

export default SearchInputField2;
