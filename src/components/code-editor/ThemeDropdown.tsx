import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { customStyles } from "../../constants/customStyles";

export const ThemeDropdown = ({ handleThemeChange, theme }: any) => {
  return (
    <Select
      placeholder={`Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};
