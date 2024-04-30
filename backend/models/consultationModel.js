import mongoose from "mongoose";

const consultationSchema = mongoose.Schema(  //create a schema as a const seperately using mongoose.schema
    {
        consultationDate: {
            type: Date,
            required: true,
        },
        consultationText: {
            type: String,
            required: true,
        },
        testDetails: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Consultation = mongoose.model("Consultation", consultationSchema);  // using the cretead schema to make a consultation model to be used in the database under Consultations colleciton