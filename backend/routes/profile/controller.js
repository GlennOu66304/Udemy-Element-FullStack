import ProfileModel from "../../models/Profile.js ";
import UserModel from "../../models/User.js ";
export default {
  createProfile: async (req, res) => {
    //  use the Model
    const newProfile = new ProfileModel({
      type: req.body.type,
      describe: req.body.describ,
      income: req.body.income,
      expand: req.body.expand,
      cash: req.body.cash,
      remark: req.body.remark,
    });
    // save the modle data into the database
    newProfile
      .save()
      .then((ticket) => {
        res.status(200).json(ticket);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  //Update  ticket
  updateProfile: async (req, res) => {
    try {
      const profile = await ProfileModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { upsert: true, setDefaultsOnInsert: true, new: true }
      );
      // [yup this looks like a confirmed bug:]
      // https://github.com/Automattic/mongoose/issues/5455
      // console.log(req.params.id);
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete ticket
  deletetProfile: async (req, res) => {
    ProfileModel.findOneAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("Ticket has been deleted");
      })
      .catch((err) => {
        res.status(404).json({ msg: "delete failed" });
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
