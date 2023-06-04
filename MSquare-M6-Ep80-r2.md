## MSquare Programing Fullstack Course
### Episode-*80* 
### Summary For `Room(2)` 
## Location and Company 
### Setting component မှာ login ၀င်ထားတဲ့ user ရဲ့ company နဲ့ location ကို ပြပေးပြီး Update လုပ်လို့ရအောင်  လုပ်ကြပါမယ်။
- အရင်ဆုံး Company ကို ပြပေးလိုက်ပါမယ်
```js
import { useContext } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import {
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
  const { locations, fetchData, company } = useContext(AppContext);
 
  return (
    <Layout title="Settings">
      <Box sx={{ p: 3, width: "300px" }}>
        
        <TextField label="Company Name" defaultValue={company?.name} />
        
      </Box>
    </Layout>
  );
};

export default Settings;

```

- context ထဲက locations , company , fetchData ကို လှမ်းယူထားပြီး company ကို mui text field နဲ့ ပြပေးထားတာဖြစ်ပါတယ်။

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114457725766742036/image.png)

### ဆက်ပြီး အဲ့ဒီ company နဲ့ ချိတ်ဆက်ထားတဲ့ location တွေကို ရွေးလို့ရအောင် လုပ်ပါမယ်။

```js
import { useContext } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationIdFromLocalStorage =
        localStorage.getItem("selectedLocationId");
      if (locationIdFromLocalStorage) {
        setSelectedLocationId(locationIdFromLocalStorage);
      } else {
        const firstLocationId = String(locations[0].id);
        setSelectedLocationId(firstLocationId);
        localStorage.setItem("selectedLocationId", firstLocationId);
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", event.target.value);
  };

  return (
    <Layout title="Settings">
      <Box sx={{ p: 3, width: "300px" }}>
        <TextField label="Company Name" defaultValue={company?.name} />
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Locations</InputLabel>
            <Select
              value={selectedLocationId}
              label="Locations"
              onChange={handleChange}
            >
              {locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default Settings;

```

- ရှင်းလင်းချက်
```js
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
```
- ရွေးထားတဲ့ location id ကို သိမ်းဖို့ state တစ်ခု လုပ်ထားလိုက်ပါတယ်
```js
useEffect(() => {
    if (locations.length) {
      const locationIdFromLocalStorage =
        localStorage.getItem("selectedLocationId");
      if (locationIdFromLocalStorage) {
        setSelectedLocationId(locationIdFromLocalStorage);
      } else {
        const firstLocationId = String(locations[0].id);
        setSelectedLocationId(firstLocationId);
        localStorage.setItem("selectedLocationId", firstLocationId);
      }
    }
  }, [locations]);
```
- Context ထဲက locations array မှာ item တွေ ရှိမရှိ စစ်လိုက်ပြီး
- ရှိခဲ့ရင် localStroage ထဲက locationId ကို လှမ်းယူလိုက်ပါတယ်
- locationId က ရှိခဲ့တယ်ဆိုရင် selectedLocationId ရဲ့ တန်ဖိုးအဖြစ် update လုပ်လိုက်တာဖြစ်ပြီး
- locationId က မရှိခဲ့ဘူးဆိုရင်တော့ locations array ထဲက ပထမ item ရဲ့ id ကို  selectedLocationId ရဲ့ တန်ဖိုးအဖြစ် update လုပ်လိုက်တာဖြစ်ပါတယ်
- အဲ့တာတွေကို useEffect ကိုသုံးပြီး location တွေ ပြောင်းတိုင်း render ပြန်လုပ်ထားလိုက်ပါတယ်
```js
const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", event.target.value);
  };
```
- MUI selector တစ်ခု ကို  အောက်မှာလုပ်ထားပြီး အဲ့ဒီမှာ တစ်ခုခု ပြောင်းလိုက်တိုင်း run မယ့် function ကို သတ်မှတ်ထားပါတယ်
- ရွေးလိုက်တဲ့ location id ကို ယူလိုက်ပြီး  selectedLocationId ရဲ့ တန်ဖိုးအဖြစ် update လုပ်လိုက်ကာ localStorage မှာလည်း သိမ်းပေးထားပါတယ်
```js
<FormControl fullWidth>
            <InputLabel>Locations</InputLabel>
            <Select
              value={selectedLocationId}
              label="Locations"
              onChange={handleChange}
            >
              {locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
```
-  MUI Selector တစ်ခု ကို ပြပေးလိုက်တာဖြစ်ပါတယ်
- အဲ့ဒီအထဲမှာ location ထဲက name တွေကို select လုပ်လို့ရအောင် လုပ်ထားပြီး ပြောင်းလဲမှု ရှိတိုင်း အထက်ပါ function ကို run ခိုင်းထားတာဖြစ်ပါတယ်
- အခု Foodie App က setting မှာ ၀င်ကြည့်ပါက location တွေရွေးလို့ရမယ့်  selector ကို မြင်ရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114771092020662362/image.png)
