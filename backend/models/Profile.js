import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    type: {
      type: String,
    },
    describe: {
      type: String,
    },

    income: {
      type: String,
    },
    expand: {
      type: String,
    },
    cash: {
      type: String,
    },
    remark: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
 
);

export default mongoose.model("Profile", profileSchema); //colle and schema
