import express from "express";
import { authJwt } from "../middleware/passport.js";
import ProfileController from "./controller.js";

const router = express.Router();

// test route
// router.get("/", (req, res) => {
//   res.send("this is the ticket route");
// });

//Create a profile
router.post("/", authJwt, ProfileController.createProfile);

//Update  a profile
router.put("/:id", authJwt, ProfileController.updateProfile);
// get a profile
router.get("/:id", authJwt, ProfileController.getAProfile);
// get tickets under this user
router.get("/", authJwt, ProfileController.getAuserAllProfile);
// //delete profile
router.delete("/:id", authJwt, ProfileController.deletetProfile);

export default router;
