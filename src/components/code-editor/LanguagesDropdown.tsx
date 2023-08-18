import Select from "react-select";
import { languageOptions } from "../../constants/languageOptions";
import { customStyles } from "../../constants/customStyles";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { useState } from "react";

type LanguagesDropdownProps = {
  onSelectChange: (sl: any) => void;
  selectedLanguage: string;
};

const LanguagesDropdown = ({
  onSelectChange,
  selectedLanguage,
}: LanguagesDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <button
      onClick={() => setOpenDropdown((prevState) => !prevState)}
      className="relative p-4 border-b-2 border-white text-sm font-semibold flex items-center gap-2"
    >
      {selectedLanguage}
      {openDropdown ? (
        <RxChevronUp color="white" size={20} />
      ) : (
        <RxChevronDown color="white" size={20} />
      )}

      {openDropdown && (
        <>
          <div className="absolute w-full top-12 bg-zinc-600 py-1 rounded-md overflow-y-auto max-h-48 z-50">
            {languageOptions.map((option) => (
              <div
                className="text-start p-2 hover:bg-zinc-700 transition-colors"
                onClick={() => onSelectChange(option)}
                key={option.id}
              >
                {option.label}
              </div>
            ))}
          </div>
          <div
            className="fixed inset-0 w-screen h-screen z-40"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDropdown(false);
            }}
          ></div>
        </>
      )}
    </button>

    // <Select
    //   placeholder={`Filter By Category`}
    //   options={languageOptions}
    //   styles={customStyles}
    //   defaultValue={languageOptions[0]}
    //   onChange={(selectedOption) => onSelectChange(selectedOption)}
    // />
  );
};

export default LanguagesDropdown;
