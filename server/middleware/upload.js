import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_URL;

//uploading files on mongoDB
const storage = new GridFsStorage({
    url: `${url}`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
            return `${Date.now()}-file-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
});

export default multer({ storage }); 
