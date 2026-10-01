import { FOCUS_RING_CLASS } from "@/constants/a11y";
import InputComponent1 from "../Inputs/InputComponent1";
import {
  SEARCH_FIELD_BUTTON_NEUTRAL,
  SEARCH_FIELD_INNER,
  SEARCH_FIELD_INPUT,
  SEARCH_FIELD_OUTER,
} from "@/constants/searchFieldShell";
import { Search } from "lucide-react";

const SearchInputField = ({
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
  [key: string]: unknown;
}) => {
  return (
    <div className={`${SEARCH_FIELD_OUTER} ${containerClassName}`}>
      <InputComponent1
        name="search"
        inputContainerClassName={`${SEARCH_FIELD_INNER} ${inputContainerClassName}`}
        inputClassName={`${SEARCH_FIELD_INPUT} ${inputClassName}`}
        containerClassName="!w-full flex-1 min-w-0"
        bordered={false}
        placeholder={placeholder}
        ariaLabel="Search"
        {...inputProps}
        {...rest}
      />
      <button
        type="button"
        aria-label="Search"
        className={`${SEARCH_FIELD_BUTTON_NEUTRAL} ${FOCUS_RING_CLASS} ${buttonClassName}`}
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

export default SearchInputField;
