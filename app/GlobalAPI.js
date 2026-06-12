const { default: axios } = require("axios");

const SendEmail = (data) = axios.post('/api/upload/send',data);

export default{
    SendEmail
}