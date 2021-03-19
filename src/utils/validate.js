/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function getCardTypeNumber(rule, value, callback){
  const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if(this.activeIndex == '1'){
      if(this.ruleFormCard.docType == '1' && reg.test(value) === false && value){
          callback(new Error('请输入正确格式的身份证号码'))
      }else {
          callback()
      }
  }else if(this.activeIndex == '2'){
      if(this.ruleFormWechat.docType == '1' && reg.test(value) === false && value){
          callback(new Error('请输入正确格式的身份证号码'))
      }else {
          callback()
      }
  }
}


