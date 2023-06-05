## MSquare Programing Fullstack Course
### Episode-*82* 
### Summary For `Room(2)` 
## MUI Autocomplete with Chip
- forntend မှာ autocomplete component တစ်ခု လုပ်ပြီး ကျန် component တွေမှာ ယူသုံးလို့ရအောင် လုပ်ပါမယ်

```js
import * as React from "react";
import useAutocomplete, {
  AutocompleteGetTagProps,
} from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option[];
}

const Autocomplete = ({ options, defaultValue }: Props) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue,
    multiple: true,
    options,
    getOptionLabel: (option) => option.name,
  });

  return (
    <Root
      sx={{
        backgroundColor: "lightblue",
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Customized hook</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: Option, index: number) => (
            <StyledTag label={option.name} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof options).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.name}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

export default Autocomplete;
```
- ရှင်းလင်းချက်
```js
const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);
```
- Root ဆိုတဲ့ component ကို သတ်မှတ်လိုက်ပြီး mui styled functionကို သုံးပြီး CSS တွေ ပေးထားတာဖြစ်ပါတယ်
- styled function ထဲမှာ နောက်ထပ် function တစ်ခု ထပ်ပေးထားပြီး theme ဆိုတဲ့ parameter တစ်ခု လက်ခံထားပါတယ်
- နောက်ဆုံး ရလဒ်ကတော့ Root အောက်မှာရှိတဲ့ div တွေ အကုန်လုံး styled function ထဲက CSS တွေ ပေးလိုက်တာဖြစ်ပါတယ်
- ကျန်တဲ့  Label ,InputWrapper , InputWrapper , Tag , StyledTag , ListBox စတာတွေလဲ အတူတူပဲဖြစ်ပါတယ်

```js
const Autocomplete = ({ options, defaultValue }: Props) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue,
    multiple: true,
    options,
    getOptionLabel: (option) => option.name,
  });

  return (
    <Root
      sx={{
        backgroundColor: "lightblue",
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Customized hook</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: Option, index: number) => (
            <StyledTag label={option.name} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof options).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.name}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};
```
- Autocomplete component ကို သတ်မှတ်ထားပြီး options နဲ့ default value ဆိုတဲ့ props နှစ်ခု လက်ခံထားပါတယ်
- အဲ့ဒီ props တွေကို useAutocomplete hook( functions) ကို ခေါ်သုံးတဲ့အခါ parameter တွေ အနေနဲ့ ထည့်သုံးထားပါတယ်
- နောက်ဆုံး အထက်မှာ သတ်မှတ်ထားတဲ့ componentတွေကို renderလုပ်ပြီးprops အနေနဲ့ ၀င်လာမယ့် options ပေါ်မူတည်ပြီး option ထဲ data တွေကို ရွေးလို့ရ ဖယ်လို့ ရ အောင် လုပ်ပေးထားတာဖြစ်ပါတယ်
- ခု အဲ့ဒီ Autocomplete component ကို MenuCategories component မှာ သုံးကြည့်ရအောင်

```js
import { Box } from "@mui/material";
import Layout from "./Layout";
import Autocomplete from "./AutoComplete";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const MenuCategories = () => {
  const testMenu = [
    {
      id: 23,
      name: "Bane mote",
    },
    {
      id: 24,
      name: " mote te",
    },
    {
      id: 25,
      name: "atote sone",
    },
    {
      id: 26,
      name: " mote lat saung",
    },
  ];
  return (
    <Layout title="MenuCategories">
      <h1>MenuCategories</h1>
      <Box>
        <Autocomplete options={testMenu} defaultValue={[testMenu[0]]} />
      </Box>
    </Layout>
  );
};

export default MenuCategories;

```
- testMenu ဆိုတဲ့ array တစ်ခု လုပ်ထားပါတယ်
- အဲ့ဒီarray ကို Autocomplete Component ကို ခေါ်သုံးတဲ့အခါမှာ options ရဲ့ တန်ဖိုးအဖြစ် ထည့်ပေးလိုက်ပြီး ပထမ item ကိုလည်း dafaultVaule array ထဲမှာ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- ခု MenuCategories မှာ သွားစမ်းကြည့်ပါက အောက်ပါအတိုင်း မြင်ရမှာဖြစ်ပါတယ်


### စစ၀င်ချင်း မြင်ရမည့်ပုံ![ပုံ(တစ်) စစ၀င်ချင်း မြင်ရမည့်ပုံ](https://cdn.discordapp.com/attachments/1076154921562411008/1115315060957519952/image.png)
### Mote te ဆိုတဲ့ item တစ်ခု ထပ်ထည့်လိုက်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1115315145418211389/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1115315212950712461/image.png)

### Bane Mote ကို ဖျက်ထုတ်ထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1115315283570204732/image.png)
