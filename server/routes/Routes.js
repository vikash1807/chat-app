import express from 'express';
import { signup, loginUser, getUsers } from '../controller/user-controller.js';
import { newConversation, getConversation } from '../controller/conversation-controller.js';
import { newMessage, getMessage } from '../controller/message-controller.js';
import { uploadFile, getImage } from '../controller/image-controller.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const route = express.Router();

route.post("/login", loginUser);
route.post("/signup", upload.single("file"), signup);
route.get("/users", authenticateToken, getUsers);

route.post("/conversation/add", authenticateToken, newConversation);
route.post("/conversation/get", authenticateToken, getConversation);

route.post("/message/add", authenticateToken, newMessage);
route.get("/message/get/:id", authenticateToken, getMessage);

route.post("/file/upload", upload.single("file"), uploadFile);
route.get("/file/:filename", getImage);

export default route;