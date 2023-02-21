
const RandomHexBytes = (bytesCount = 16) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < bytesCount; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  };


const RandomizeInteger = (min = 0, max = 1000)=> { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const CreateUUID = () => {
  let dt = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

module.exports = {
  CreateUUID,
  RandomHexBytes,
  RandomizeInteger
};
