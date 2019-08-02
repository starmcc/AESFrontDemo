# 前端js对称加解密库

> 前端库crypto-js

```
https://github.com/brix/crypto-js
```

## Demo

### 获取真正的密钥

> SHA1PRNG

在前端加解密处理过程中，我们要把原始秘钥经过两次`sha1`加密，最后取其字符串前`32`位。 

```javascript
function getKey(key) {
    //真正的key
    return CryptoJS.SHA1(CryptoJS.SHA1(key)).toString().substring(0, 32)
}
```

### 加密

```javascript
function encrypt(data,key) {
    let encrypt = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(getKey(key)), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypt.ciphertext.toString(CryptoJS.enc.Base64)
}
```

### 解密

```javascript
function decrypt(data,key) {
    let decrypt = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(data)
    }, CryptoJS.enc.Hex.parse(getKey(key)), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
}
```



# 在node中使用自带的crypto库

```javascript
//配置秘钥
let getkey=()=>"******";
let md5key=()=>"******";

// 加密
let encrypt = (data)=>{
  let key = realKey();
  let crypted='';
  let cipher = crypto.createCipheriv('aes-128-ecb', key, "");
  crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = new Buffer(crypted, 'binary').toString('base64');
  return crypted;
}

// 解密
let decrypt=(data)=>{
  let key = realKey();
  let decipher = crypto.createDecipheriv('aes-128-ecb', key,"");
  const buf1 = new Buffer(data,"base64").toString('hex');
  let decrypted = decipher.update(buf1, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 获取key
let realKey=()=>{
  let key = getkey();
  let keysha1 = crypto.createHash('sha1').update(key).digest('buffer');
  let realkey = crypto.createHash('sha1').update(keysha1).digest('hex').substring(0,32);
  return new Buffer(realkey,'hex');
}

let encryptmd5=(data)=>{
  let key = md5key();
  let str = data+"|"+key;
  let md5str = crypto.createHash('md5')
                .update(str)
                .digest('base64');
  return md5str;
}

module.exports = {
  encrypt,
  decrypt,
  encryptmd5
};
```

