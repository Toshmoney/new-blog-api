require("dotenv").config()
const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const _ = require("lodash")
// const flash = require("flash")
const Posts = require("../model/Posts");
const Comment = require("../model/Comment");
const secret = process.env.SECRETE;

// ============== Create Post ================

const createNewPost = async(req, res)=>{

    // Getting in-coming files and renaming it

    const {originalname, path} = req.file;
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath)

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info)=>{
        if(err) throw err;
        const {title, summary, content} = req.body;
        try {
            const createdPost = await Posts.create({
                title,
                content,
                cover_img : newPath,
                summary,
                author : info.id
            });
            res.json(createdPost)
    
            } catch (error) {
               res.json(error) 
            }
    })

   

};

// ============== Get Single Post ================


const getSinglePost = async(req, res)=>{
    const title = req.params['title'].replace('%20', '-')
    // const title = _.lowerCase(req.params['title'])
    try {
    const foundPost = await Posts.findOne({title: title})
    .populate("author", ["username"])

    res.status(200).json(foundPost)
    foundPost.views++;
    foundPost.save()
    } catch (error) {
        console.log(error);
    }
};

// ============== Get Post Comments ================

const getComments = async(req, res)=>{
    const {id} = req.body;
    Comment.find({ blogPostId: id })
    .sort({ timestamp: 'desc' })
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
        console.error('Failed to fetch comments', error);
        res.json({comments: []});
      });
}

// ============== Get All Posts ================

const getAllPost = async(req, res)=>{
    try {
    const foundPost = await Posts.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    res.status(200).json(foundPost)
    } catch (error) {
        console.log(error);
    }
};

// ============== Edit Single Post ================

const editSinglePost = async(req, res)=>{
    let newPath = null
    if(req.file){
        const {originalname, path} = req.file;
        const part = originalname.split(".");
        const ext = part[part.length - 1];
        newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath)
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info)=>{
        if(err) throw err;
        const {id, content, title, summary} = req.body;
        const postDoc = await Posts.findById({_id : id});
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor){
            return res.status(400).json("You can't edit a post you're not the author!")
        }

        await postDoc.updateOne({
            title,
            content,
            summary,
            cover_img: newPath ? newPath : postDoc.cover_img
        },
        {$set: req.body}, (err)=>{
            if (!err){
                res.json("Post updated successfully!")
            }else{
                res.json(err)
            }
        })

        
    })

    
};

// ============== Add Comments functionality ================

const addComments = async(req, res)=>{
    // const {id} = req.params;
    const { comment, author, id } = req.body;
    try {
        const foundPost = await Posts.findById({_id : id})
        if(foundPost){
            const createdComment = await Comment.create({
                blogPostId: id,
                content: comment,
                author
            })

            createdComment.save()
            
            .then(() => {
            res.json(createdComment);
            })
            .catch((error) => {
            console.error('Failed to save comment', error);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// ============== Delete Single Post ================

const deleteSinglePost = async(req, res)=>{
    const {id} = req.params
    try {
        await Posts.deleteOne({id: id}, (err)=>{
            if(!err){
                res.redirect("/")
                console.log("Post deleted successfully!");
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteAllPost = async(req, res)=>{
    const {id} = req.params;
    try {
         await Posts.deleteMany({_id : id},  (err)=>{
            if(!err){
                res.redirect("/")
                console.log("Posts deleted successfully!");
            }
            })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createNewPost, getAllPost,
    getSinglePost, editSinglePost, deleteAllPost,
    deleteSinglePost, getComments, addComments}