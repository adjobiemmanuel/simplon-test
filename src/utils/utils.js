const utils = {
    is_number(value){
  return /^[0-9]{10}$/.test(value)
    },
    is_string(value){
        return /[^a-zA-Z]/.test(value)
    }
}

export default utils;