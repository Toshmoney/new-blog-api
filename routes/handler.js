const express = require("express");
const multer = require("multer");
const upload = multer({dest : 'uploads/'});
const {login, register, profile } = require("../controller/controller");
const { getAllPost, createNewPost, getSinglePost, editSinglePost, deleteSinglePost, deleteAllPost, getComments, addComments } = require("../controller/postsController");
const router = express.Router();

router.route("/").get(getAllPost);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/create-post").post(upload.single('file'), createNewPost);
router.route("/:title").get(getSinglePost);
router.route("/:id/comments").get(getComments);
router.route("/:id/comments").post(addComments);
router.route("/edit/:id").put(upload.single('file'), editSinglePost);
router.route("/profile").get(profile);
router.route("/:id").delete(deleteSinglePost);
router.route("/posts").delete(deleteAllPost);

module.exports = router;