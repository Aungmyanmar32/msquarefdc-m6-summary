## MSquare Programing Fullstack Course
### Episode-*81* 
### Summary For `Room(2)` 
## Create New Menu
### Menu create လုပ်ဖို့ `create-menu` ruote နဲ့CreateMenus ဆိုတဲ့ component တစ်ခု လုပ်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114852567525118072/image.png)

```js
// frontend / src / components / CreateMenus.tsx

import React from "react";

const CreateMenus = () => {
  return <div>CreateMenus</div>;
};

export default CreateMenus;
```
- ဆက်ပြီး name တွေ price တွေ ထည့်လို့ရအောင် ဆက်ရေးပါမယ်

```js
// frontend / src / components / CreateMenus.tsx

import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Layout from "./Layout";

const CreateMenus = () => {
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
  });

  const createNewMenu = () => {
    console.log(newMenu);
  };

  return (
    <Layout title="Create menu">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          ml: 3,
          mt: 5,
        }}
      >
        <TextField
          placeholder="Name"
          sx={{ mb: 2 }}
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        />
        <TextField
          placeholder="Description"
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenu({ ...newMenu, description: evt.target.value })
          }
        />
        <TextField
          type="number"
          placeholder="Price"
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenu({ ...newMenu, price: Number(evt.target.value) })
          }
        />

        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={createNewMenu}
        >
          Create
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateMenus;

```


- newMenu ဆိုတဲ့ state တစ်ခု သတ်မှတ်ထားပြီး
- return မှာ mui text input သုံးခုနဲ့ button တစ်ခု ထည့်ပေးလိုက်ပါတယ်
- i text input တွေမှာ တစ်ခုခုချိန်းလိုက်တိုင်း newMenu state ကို update လုပ်ထားပြီး button ကို click လိုက်တဲ့ အချိန်မှာ createNewMenu ဆိုတဲ့ function ကို ခေါ်ထားလိုက်ပါတယ်
- createNewMenu ဆိုတဲ့ function မှာတော့ newMenu ကို log ထုတ်ထားလိုက်ပါတယ်
- ခု app မှာ **`/create-menus`** route မှာ ၀င်ပြီး စမ်းကြည့်ပါမယ်
- 
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114861055462613022/image.png)
##
### uploading image
- ဆက်ပြီး menu အသစ်တစ်ခုလုပ်တိုင်း ပုံပါတင်လို့ရအောင် ဆက်လုပ်ပါမယ်
- image တွေကို drag n drop လုပ်ပြီး တင်လို့ရအောင် react drop zone ကို သုံးပါမယ်

```console
npm i react-dropzone
```
- FileDropzone.tsx တစ်ခုလုပ်ပါမယ်
```js
// src / components / FileDropzone.tsx

import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        p: 1,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDropZone;
```
- FileDropZone component မှာ onFileSelected ဆိုတဲ့ function props တစ်ခု လက်ခံထားပြီး  OnDrop function မှာ ပြန်ခေါ်သုံးပေးထားပါတယ်
- ဖိုင်တစ်ခုခု ထည့်လိုက်တိုင်း useDropzone ကို သုံးပြီး OnDrop function ကို run ပေးထားပါတယ်
- အခု အဲ့ဒီ FileDropZone component ကို crate menu လုပ်တဲ့နေရာမှာ သုံးပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114875170109263922/image.png)

- CrateMenu.tsx မှာ selectedFiles ဆိုတဲ့ state တစ်ခု သတ်မှတ်ထားပါတယ်
- onFilesSelected ဆိုတဲ့ function တစ်ခုလည်း သတ်မှတ်ထားပြီး props တစ်ခု လက်ခံထားကာ အဲ့ဒီprops ကိုပဲ selectedFiles ဆိုတဲ့ state ရဲ့ တန်ဖိုး အဖြစ် သတ်မှတ်ပေးထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114876160157945886/image.png)

- create button ရဲ့ အပေါ်မှာ fileDropZone component ကို သုံးထားပြီး props အနေနဲ့ onFileSelected function ကို ထည့်ပေးလိုက်ပါတယ်
- File drop zone အောက်နားမှာတော့ selectedFiles ဆိုတဲ့ state ( array ) ကို loop လုပ်ပြီး mui chip နဲ့ ပြပေးထားတာဖြစ်ပါတယ်
- mui chip မှာ delete လုပ်လို့ရတဲ့ button ပါပြီး နှိပ်လိုက်ရင် selectedFiles ဆိုတဲ့ state ( array ) ထဲကနေ ဖယ်ထုတ်ထားလိုက်စေပါတယ်
- create-menu route မှာ ဖိုင်တစ်ခု drag n drop လုပ်ကြည့်ပါက အောက်ကပုံလို ပြပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1114994250296340600/image.png)

- ခုဆိုရင် menu တစ်ခု  crate လုပ်ဖို့ လိုအပ်တဲ့ input  တွေ ပြင်ဆင်ထားပြီး မလို့ ဆာဗာဆီ request လုပ်ပါတော့မယ်

```js
// CrateMenus.tsx --> CreateNewMenu function


  const createNewMenu = async () => {
    const isValid = newMenu.name && newMenu.description;
    if (!isValid) return console.log("Name and description required.");
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }

    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
  };
```
- ရှင်းလင်းချက်
```
  const isValid = newMenu.name && newMenu.description;
    if (!isValid) return console.log("Name and description required.");
```
- New menu အတွက် Name နဲ့ description ပါမပါ စစ်လိုက်ပြီး မပါလာခဲ့ရင် consle တစ်ခုသာ လုပ်ပြီး retrun လုပ်လိုက်တာဖြစ်ပါတယ်
```
  if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }
```
- New menu အတွက် Name နဲ့ description ပါလာခဲ့ရင်တော့ /assets route ဆီ ကို ထည့်လိုက်တဲ့ file ကို formData နဲ့ body အဖြစ်ထည့်ပြီး request ပို့ပေးလိုက်ကာ response ပြန်လာတဲ့ data ထဲက sssetUrl  ကို newMenu state က asset url ရဲ့ တန်ဖိုးအဖြစ် သတ်မှတ်ပေးလိုက်တာဖြစ်ပါတယ်

```
 const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
```
- နောက်ထပ် /menus route ဆီကို newMenu state ရဲ့ တန်ဖိုးတွေ ပါ ထည့်ပြီး request ထပ်လုပ်လိုက်တာဖြစ်ပါတယ်
- ခု ဆာဗာမှာ ၀င်လာတဲ့ request တွေကို လက်ခံပြီး သက်ဆိုင်ရာ database server တွေဆီကို ချိတ်ဆက် အလုပ်လုပ်မှာ ဖြစ်ပါတယ်
- backend မှာ လိုအပ်တဲ့ package တွေ အရင် ထည့်ပေးပါမယ်
```console
npm i @aws-sdk/client-s3 multer multer-s3
npm i -D @types/multer-s3 @types/multer
```
- ဆက်ပြီး . env နဲ့ config မှာ key တွေ ထပ်ထည့်ပါမယ်

```js
// .env
JWT_SECRET=xaCcJvyyM2r0OKC3CwiTf0XmJym8LMhP5EOikmDC5MImXSmXIqKqfXOsivpa9Zjtp9k90w9oIW0nYCp1zmVghwa0l0IvVlUf0o86

  

SPACE_ACCESS_KEY_ID= *Ask to Aungmyanmar*

SPACE_SECRET_ACCESS_KEY= *Ask to Aungmyanmar*

SPACE_ENDPOINT=https://sgp1.digitaloceanspaces.com/
```
```js
// config/config.ts

interface Config {
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndpoint: string;
}

export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
};
```
- အရင်ဆုံး formData ထဲက ပုံကို dagital -ocean space မှာ တင်ပါမယ်
- backend / src / utils အောက်မှာ fileUpload.ts ဖိုင်တစ်ခု လုပ်ပါမယ်။
```js
//backend / src / utils / fileUpload.ts

import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";

// Set S3 endpoint to DigitalOcean Spaces
const s3Config = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

// Change bucket property to your Space name
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `happy-pos/msquare/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("file", 1);


```
- အရင် သင်ခန်းစာအဟောင်းတွေထဲက ပုံတင်တဲ့ code တွေကိုပဲ ပြန်ထည့်ပေးထားတာမလို့ ရှင်းလင်းချက် မထည့်တော့ပါ။

- အဲ့ဒီ fileUpload ကို appRouter ထဲမှာ /assets route နဲ့ ၀င်လာတဲ့ request ကို လက်ခံတဲ့ နေရာမှာ သုံးပါမယ်
```js
//src/routers/ appRouter.ts

appRouter.post("/assets", (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        return res.sendStatus(500);
      }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
```
- ခုနက သတ်မှတ်ထားတဲ့ fileUpload function ကို ခေါ်သုံးလိုက်ပြီး request နဲ့အတူ ပါလာတဲ့ file ကို DOC space ပေါ်တင်လိုက်ပြီး ရလာတဲ့ url ကို response ပြန်ပေးလိုက်တာဖြစ်ပါတယ်
##
### ဆက်ပြီး အသစ်လုပ်လိုက်တဲ့ menu ပါတဲ့ request ကို menuRouter မှာ လက်ခံပြီး database ထဲက menus table မှာ သိမ်းလိုက်ပါမယ်

```js
// menuRouter,ts

import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menuRouter = express.Router();

menuRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
});

menuRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, description, price, assetUrl } = req.body;
  const newMenuResult = await db.query(
    "insert into menus (name, description, price, asset_url) values($1, $2, $3, $4) returning *",
    [name, description, price, assetUrl]
  );
  res.send(newMenuResult.rows);
});

export default menuRouter;
```
- request နဲ့အတူပါလာတဲ့ data တွေကို databaseမှာ insertလုပ်ပြီး သိမ်းလိုက်တာဖြစ်ပါတယ်
- ခု menu အသစ်တစ်ခု လုပ်စမ်းကြည့်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1115012264785891338/image.png)
- data တွေ ထည့်ပြီး create လုပ်လိုက်ပါက image url ပါ ပါတဲ့ mens တစ်ခု ကို response ပြန်ပေးတာကို မြင်ရမှာပါ
- database ထဲက menus table ထဲမှာ လည်း row တစ်ခု တိုးလာတာကို မြင်ရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1115012996062785617/image.png)
