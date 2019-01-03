# 前端库

前端库crypto-js

```
https://github.com/brix/crypto-js
```

#  前端js对称加解密

> 前端使用cryptojs加密库
> 由于之前对加密算法不是很了解，并且项目内的Key并非直接使用，所以在处理KEY的问题上花费了较多的时间。 

## SHA1PRNG

> java里可以是经过这个算法处理过的，在前端处理过程中，我们要把原始秘钥经过两次sha1加密，最后取其字符串前32位。 

## 加密

```javascript
    function encrypt(data,key) {
      var realKey = getKey(key);
      var encrypt = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(realKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypt.ciphertext.toString(CryptoJS.enc.Base64);
    }
```

## 解密

```javascript
    function decrypt(data,key) {
      var realKey = getKey(key);
      var decrypt = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(data)
      }, CryptoJS.enc.Hex.parse(realKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypt.toString(CryptoJS.enc.Utf8);
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

