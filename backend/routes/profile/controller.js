import ProfileModel from "../../models/Profile.js ";
import UserModel from "../../models/User.js ";
export default {
  createProfile: async (req, res) => {
    //  use the Model
    const newProfile = new ProfileModel({
      type: req.body.type,
      describe: req.body.describe,
      income: req.body.income,
      expand: req.body.expand,
      cash: req.body.cash,
      remark: req.body.remark,
    });
    // save the modle data into the database
    newProfile
      .save()
      .then((ticket) => {
        res.status(200).json({
          success: true,
          msg: "create profile successfully",
          ticket,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  //Update  ticket
  updateProfile: async (req, res) => {
    try {
      const profile = await ProfileModel.findByIdAndUpdate(
        req.params.id ,
        {
          $set: req.body,
        },
        { upsert: true, setDefaultsOnInsert: true, new: true }
      );
      // [yup this looks like a confirmed bug:]
      // https://github.com/Automattic/mongoose/issues/5455
      // console.log(req.params.id);
      res.status(200).json({
        msg: "update successfully",
        success: true,
        profile,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete ticket
  deletetProfile: async (req, res) => {
    console.log(req.params.id);
    // find and delete does not work here, need to replace with findOneAndRemove
    ProfileModel.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
      if (err) {
        res.status(404).json({ msg: "delete failed" });
      } else {
        console.log("Result : ", docs);
        res.status(200).json({ success: true, msg: "Ticket has been deleted" });
      }
    });
  },

  //get a profile

  getAProfile: async (req, res) => {
    // ticket details content only the ticket creater can view it
    // verifiy the user login, then go to the ticket id
    console.log(req.params.id);
    await ProfileModel.findById(req.params.id, (err, docs) => {
      if (err) {
        res.status(404).json({ msg: "no Profile details found" });
      } else {
        // console.log("Result : ", docs);
        res.status(200).json(docs);
      }
    });
  },

  // get all ticket
  getAuserAllProfile: async (req, res) => {
    // console.log(req.user.id);
    const data = await ProfileModel.find((err, res) => {
      if (err) {
        // res.status(403).json({ msg: "no user found" });
        console.log(err);
      }
      // res.status(200).json(res);
      console.log("data fetch succsssfully");
    });

    if (!data) {
      res.status(403).json({ msg: "no user found" });
    }
    res.status(200).json(data);
  },
};
