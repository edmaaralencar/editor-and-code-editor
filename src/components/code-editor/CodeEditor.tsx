import { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { languageOptions } from "../../constants/languageOptions";

import { toast } from "react-toastify";

import { useKeyPress } from "../../hooks/useKeyPress";
import clsx from "clsx";
import { defineTheme } from "../../lib/code-editor";
import LanguagesDropdown from "./LanguagesDropdown";
import { OutputDetails } from "./OutputDetails";
import { OutputWindow } from "./OutputWindow";

const javascriptDefault = `// some comment`;

export const CodeEditor = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<null | boolean>(null);
  const [theme, setTheme] = useState<any>("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };
  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th: {
    label: string;
    value: string;
    key: string;
  }) {
    // We will come to the implementation later in the code
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("clouds-midnight").then((_) =>
      setTheme({
        label: "Clouds Midnight",
        value: "clouds-midnight",
        key: "clouds-midnight",
      })
    );
  }, []);

  const showSuccessToast = (msg?: any) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg?: any) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="inset-0 w-full h-96 sticky top-8">
      {/* <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div> */}
      <div className="border-t border-r border-l rounded border-zinc-600">
        <LanguagesDropdown
          onSelectChange={onSelectChange}
          selectedLanguage={language.label}
        />
      </div>
      <CodeEditorWindow
        code={code}
        onChange={onChange}
        language={language?.value}
        theme={theme.value}
      />
      <div className="p-4 flex flex-col gap-4 border border-zinc-600">
        <div className="flex flex-col gap-4 lg:flex-row items-stretch lg:gap-2">
          <OutputWindow outputDetails={outputDetails} />
          <button
            onClick={handleCompile}
            disabled={!code}
            className={clsx(
              "border-none text-zinc-800 px-4 h-12 rounded-md text-sm hover:bg-white/90 transition-colors bg-white flex-shrink-0",
              !code && "opacity-50"
            )}
          >
            {processing ? "Processing..." : "Compile and Execute"}
          </button>
        </div>
        {/* <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          /> */}
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
      </div>
    </div>
  );
};

// return <div className="bg-red-500 inset-0 w-full h-96 sticky top-8"></div>;
