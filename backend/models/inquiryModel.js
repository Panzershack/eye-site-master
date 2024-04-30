import mongoose from "mongoose";
const inquirySchema = mongoose.Schema({
        
        Email: { 
            type: String, 
            required: true 
        },
        Type: { 
            type: String, 
            required: true 
        },
        Text: { 
            type: String, 
            required: true 
        },
        
    },
    {
        timestamps: true,
    }
);
        
export const inquiry = mongoose.model('inquiry', inquirySchema);
