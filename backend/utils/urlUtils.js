const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };
  
  module.exports = { isValidUrl };
  