import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
    {
        supplierName: {
            required: true,
            type: String
        },
        product: {
            required: true,
            type: String
        },
        brand: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        contactNo: {
            required: true,
            type:String
        },
    },
    {
        timestamps: true,
    }
);
        
export const supplier = mongoose.model('supplier', supplierSchema);
