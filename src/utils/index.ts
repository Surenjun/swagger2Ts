const axios = require('axios').default
const crypto = require('crypto')

/**
 * @desc 首字母大写
 */
export const capitalizedTitleCase = (letter: string) => {
    return letter.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
}


/**
 * @desc 中英文转换 调用百度翻译
 */
export const  translate = async (word: string) => {

    const md5 = crypto.createHash("md5");
    const salt = Math.random();
    md5.update('20220328001146617' + word + salt + '0QBqcQBV4TTyoE4tgVKj');
    const sign = md5.digest('hex');
    const {data} = await axios.post('https://fanyi-api.baidu.com/api/trans/vip/translate',{
        q:word,
        from :'zh',
        to:'en',
        appid:'20220328001146617',
        salt,
        sign

    })

}