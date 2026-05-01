import fs from "fs";
import Resume from "../models/Resume.js";
import imagekit from "../configs/imagekit.js";


// controller for creating a new resume
//post: /api/resumes/create



export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        //create new resume
        const newResume = await Resume.create({
            user: userId,
            title,
        })
        //return success message
        res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for deleting a resume
//delete: /api/resumes/:id

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ _id: resumeId, user: userId });

        //return success message
        res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//get user resume by id
//get: /api/resumes/:id
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        
        console.log('Fetching resume:', { userId, resumeId });
        
        const resume = await Resume.findOne({ user: userId, _id: resumeId });
        if (!resume) {
            console.log('Resume not found for user:', userId, 'with id:', resumeId);
            return res.status(404).json({ message: "Resume not found" });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        // Keep updatedAt for frontend to display the date

        res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//get resume by id for public view
//get: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
    try {

        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Public resume not found" });
        }

        res.status(200).json({ resume });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// controller for updating a resume
//put: /api/resumes/update

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData);
        }else{
            resumeDataCopy = structuredClone(resumeData);
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: "resume.png",
                folder: "user_resumes",
                transformation:{
                    pre:'w_300,h_300,fo_face,z-0.75'+(removeBackground ? ",e_background_removal" : "")
                }
            });

            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await Resume.findOne({ user: userId, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        
        // Actually update the resume with new data
        const updatedResume = await Resume.findOneAndUpdate(
            { user: userId, _id: resumeId },
            resumeDataCopy,
            { new: true }
        );
        
        return res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}