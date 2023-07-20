## MSquare Programing Fullstack Course
### Episode-*101* 
### Summary For `Room(2)`
## Create QR code for table
- အရင်သင်ခန်းစာမှာ copy paste လုပ်ထားတဲ့အထဲက function အသစ်နေနဲ့ ပါလာတဲ့ table တစ်ခု create လုပ်တဲ့အခါ QR code တစ်ခုပါ create လုပ်တဲ့ function ကို ထည့်သွင်းခဲ့ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131502172161445889/image.png)

```js
// utils/server.ts--> QR code function

export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderAppUrl}?locationId=${locationId}&tableId=${tableId}`;
};

export const qrCodeImageUpload = async (
  locationId: number,
  tableId: number
) => {
  try {
    const qrImageData = await QRCode.toDataURL(
      generateLinkForQRCode(locationId, tableId)
    );
    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/qrcode/msquare/locationId-${locationId}-tableId-${tableId}.png`,
      ACL: "public-read",
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(input);
    await s3Client.send(command);
  } catch (err) {
    console.error(err);
  }
};
```
> ရှင်းလင်းချက်

```js
export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderAppUrl}?locationId=${locationId}&tableId=${tableId}`;
};
```
- QR code တစ်ခု လုပ်ဖို့အတွက် link တစ်ခုကို location id နဲ့ table id ကို သုံးပြီး generate လုပ်ပေးမယ့် function ဖြစ်ပါတယ်

```js
xport const qrCodeImageUpload = async (
  locationId: number,
  tableId: number
) => {....}
```
-  locationId နဲ့  tableId တွေကို parameter အနေနဲ့ လက်ခံပြီး ဆာဗာမှာ upload လုပ်ပေးမယ့် function ကို သတ်မှတ်ထားပါတယ်။

```js
const qrImageData = await QRCode.toDataURL(
      generateLinkForQRCode(locationId, tableId)
    );
```
- QRCode.toDataURL method ကို သုံးပြီးအပေါ်က generateLinkForQRCode function နဲ့ image data တစ်ခု create လုပ်ထားပါတယ်

```js
 const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/qrcode/msquare/locationId-${locationId}-tableId-${tableId}.png`,
      ACL: "public-read",
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
```
- upload လုပ်မယ့် image အတွက် object တစ်ခု သတ်မှတ်ထားပါတယ်
- object အထဲမှာ သိမ်းမယ့်နေရာ Bucket , အမည် (key) , ACL အဖြစ် public , body data အနေနဲ့ imageData ကို မလိုတဲ့ စာတစ်ချို့  ဖြုတ်ထုတ်လိုက်ပြီး buffer လုပ်ကာ   ထည့်ပေးလိုက်တာပဲ ဖြစ်ပါတယ်
```js
 const command = new PutObjectCommand(input);
    await s3Client.send(command);
```
- input object ကို aws က PutObjectCommand တစ်ခု အသစ်လုပ်ပြီး `s3Client.send()` နဲ့ server ဆီ upload လုပ်လိုက်တာပဲဖြစ်ပါတယ်
##
### Create new table with QR code
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131518047136522351/image.png)
- new Table state ထဲမှာ name ရဲ့ တန်ဖိုးရှိခဲ့ရင် api ထဲက /tables route ကို post method နဲ့ request လုပ်ပြီး newtable state ရဲ့ တန်ဖိုးကိုပါ ထည့်ပေးလိုက်ပါတယ်
- ပြန်လာတဲ့ resopnse ကို store ထဲက table slice မှာရှိတဲ့ addTable action ကို dispatch လုပ်လိုက်ပါတယ်
- 
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131518986589311057/image.png)
- api ထဲမှာတော့ POST method နဲ့ ၀င်လာတဲ့ Request ထဲမှာ name နဲ့ location ID ပါမပါစစ်လိုက်ပြီး ပါလာခဲ့ရင် prisma create ကို သုံးပြီး `Tables` table ထဲမှာ name နဲ့ locationId ကို row တစ်ခုနဲ့ထည့်လိုက်ပါတယ်
- ထပ်ပြီးတော့ အစောပိုင်းမှာရှင်းပြထားတဲ့ qrCodeImangeUpload function ကို သုံးပြီး qr image တစ်ခု generate and upload လုပ်လိုက်ပါတယ်
- အဲ့ဒီ upload လုပ်ထားတဲ့ image ကို qrCodeUrl function ကို သုံးပြီး url တစ်ခု ရယူလိုက်ပါတယ်
- အဲ့ဒီUrl ကို ခုနက crate လုပ်ထားတဲ့ row ထဲက assetUrl မှာ update လုပ်ပေးလိုက်ပါတယ်
- ခု table တစ်ခု create လုပ်ကြည့်ပါက databaseမှာ QR code image Url ပါ ပါတဲ့ row တစ်ခုကို create လုပ်ပေးလိုက်တာကို မြင်ရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131520805973528576/image.png)
##
### Protective routes with *Next Auth Middleware*
- project ထဲမှာရှိတဲ့ backoffice နဲ့ api အောက်က route တွေထဲကို ၀င်လာရင် login ၀င်ထားခြင်း ရှိမရှိ စစ်ပြီး login မ၀င်ထားရင် login ၀င်ခိုင်းဖို့အတွက် route တစ်ခုချင်းမှာ getSession/useSession ကို သုံးပြီး စစ်ပြီးမှ redrict လုပ်ထားလို့ရပါတယ်
- အဲ့ဒီလိုလုပ်မယ့်အစား next auth middlwareကို အသုံးပြုလိုက်ရင် routeတစ်ခုချင်းစီမှာ check စရာမလိုတော့ပဲ next js က auto check ပေးပြီး login ကို redirect လုပ်ပေးမှာဖြစ်ပါတယ်
- src folder အောက်မှာ middleware.ts ဖိုင်တစ်ခုလုပ်ပေးပြီး protect လုပ်ချင်တဲ့ route ကို ထည့်ပေးရမှာဖြစ်ပါတယ်
- next js မှာ next auth middleware ကို သုံးချင်ရင် file နေရာနဲ့ file နာမည်ကို အတိအကျ လုပ်ပေးရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131523331699519518/image.png)
- အထက်ပါအတိုင်း ရေးပေးရမှာဖြစ်ပြီး matcher array ထဲမှာတော့ protect လုပ်ချင်တဲ့ route တွေ ထည့်ပေးရမှာဖြစ်ပါတယ်
- `/backoffice/:path*` ဆိုတာက`:path*` wild-card ကို သုံးပြီး /backoffice အောက်မှာရှိတဲ့ route တွေ အကုန်လုံးလို့ သတ်မှတ်လိုက်တာပါ
- `/api/:path*` ဆိုတာက`:path*` wild-card ကို သုံးပြီး /api အောက်မှာရှိတဲ့ route တွေ အကုန်လုံးလို့ သတ်မှတ်လိုက်တာပါ
- အခုဆိုရင် backoffice app ထဲက ဘယ် route ကိုပဲ ၀င်၀င် login ( sign in) မလုပ်ထားရင် sign in page ကို redirect လုပ်ပြီး login ၀င်ခိုင်းတာကို တွေ့ရမှာဖြစ်ပါတယ်
