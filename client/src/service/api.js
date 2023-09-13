import axios from "axios";
import { getAccessToken } from "../utils/common-utils";

const url = 'http://localhost:8000';

//user login api
export const userLogin= async (data) => {
    try {
        let response = await axios.post(`${url}/login`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling login API ', error);
        throw new Error('Error while calling login API');
    }
}

//signup api
export const userSignup = async (data) => {
    try {
        const response= await axios.post(`${url}/signup`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling signUp API ', error);
        throw new Error('Failed to sign up');   
    }
}

//get users api
export const getUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`, {
            headers: {
              Authorization: getAccessToken(),
            },
          });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

//set convo
export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data, {
            headers: {
              Authorization: getAccessToken(),
            },
          });
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

//get convo
export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${url}/conversation/get`, users, {
            headers: {
              Authorization: getAccessToken(),
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

// new message api
export const newMessage = async (data) => {
    try {
        return await axios.post(`${url}/message/add`, data, {
            headers: {
              Authorization: getAccessToken(),
            },
          });
    } catch (error) {
        console.log('Error while calling newMessage API ', error);
    }
}

//get message api
export const getMessage = async (id) => {
    try {
        let response = await axios.get(`${url}/message/get/${id}`, {
            headers: {
              Authorization: getAccessToken(),
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling getMessage API ', error);
    }
}

//upload file=
export const  uploadFile= async (data) => {
    try {
        return await axios.post(`${url}/file/upload`, data);
    }
    catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}