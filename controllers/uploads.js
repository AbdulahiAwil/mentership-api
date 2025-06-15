import { file, success } from "zod/v4"
import cloudinary from "../utility/cloudinary.js"


export const uploadFile = (req, res, next) =>{
    if(!req.file){
        return res.status(400).json({message: 'No file Uploaded'})
    }

    const stream = cloudinary.uploader.upload_stream(
        {folder: "First_uploader_folder", resource_type: "auto"},
        (error, result) => {
            if (error) return next(error)
            return res.status(201).json({
                success: true,
                fileUrl: result.secure_url
        })
        }
    )

    stream.end(req.file.buffer)
}