// 引入加密库
// 引入前请npm引入包 npm install -S crypto-js
import CryptoJS from 'crypto-js'

// 秘钥
const key = '后端提供的秘钥'

function getKey(key) {
	//真正的key
	return CryptoJS.SHA1(CryptoJS.SHA1(key)).toString().substring(0, 32)
}

export default {
	/**
	 * 加密
	 * @param {*} data 
	 */
	encrypt(data) {
		let encrypt = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(getKey(key)), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		})
		return encrypt.ciphertext.toString(CryptoJS.enc.Base64)
	},

	/**
	 * 解密
	 * @param {*} data 
	 */
	decrypt(data) {
		let decrypt = CryptoJS.AES.decrypt({
			ciphertext: CryptoJS.enc.Base64.parse(data)
		}, CryptoJS.enc.Hex.parse(getKey(key)), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
		return decrypt.toString(CryptoJS.enc.Utf8)
	}
}

