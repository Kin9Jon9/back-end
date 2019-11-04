var express = require('express');
var router = express.Router();
const utils = require('../../module/utils/utils');
const resMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');
const db = require('../../module/pool');
const authUtils = require('../../module/utils/authUtils');
const upload = require('../../config/multer');
const jwt = require('../../module/jwt');
const moment = require('moment');
/* GET home page. */

//전체 목록 가져오기
router.get('/', async(req,res) =>{

    const getItemQuery = "SELECT thumbnail, title FROM item ORDER BY views ASC";
    const getItemResult = await db.queryParam_Parse(getItemQuery,) 

    if(!getItemResult){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.GET_BAD_RESULT));
    }else{
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.SUCCESS_POST_ITEM, getCateItemResult));
    }
});

//게시물 하나 가져오기
router.get('/:item_idx', async(req, res)=>{
    const itemIdx = req.params.item_idx;
    const getAllItemInfoQuery = "SELECT * FROM item WHERE item_idx = ?"
    const getAllItemInfoResult = await db.queryParam_Parse(getAllItemInfoQuery, [itemIdx])

    if(!getAllItemInfoResult){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.GET_BAD_RESULT));
    }else{
        //resMessage 설정 어떻게 해야 하는지?
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.SUCCESS_POST_ITEM, getCateItemResult));
    }
});

//게시물 등록하기
router.post('/', async(req, res) =>{

    const writer_idx = req.body.writer_idx;
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const thumbnail = req.body.thumbnail;
    const hashtag = req.body.hashtag;
    const text = req.body.text;
    const category_idx = req.body.category_idx;
    const title = req.body.title;
    // const {writer_idx, date, thumbnail, hashtag, text, category_idx, title} = req.body

    const insertItemQuery = "INSERT INTO item (writer_idx, date , thumbnail, hashtag, text, category_idx, title) VALUES (?,?,?,?,?,?,?)";
    const insertItemResult = await db.queryParam_Parse(insertItemQuery, [writer_idx, date , thumbnail, hashtag, text, category_idx, title]);

    if(!insertItemResult){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.POST_BAD_RESULT));
    }else{
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.SUCCESS_POST_ITEM, insertItemResult));
    }
});

//게시물 수정하기
router.put('/:item_idx', async(req, res) =>{

    const itemIdx = req.params.item_idx;
    const writer_idx = req.body.writer_idx;
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const thumbnail = req.body.thumbnail;
    const hashtag = req.body.hashtag;
    const text = req.body.text;
    const category_idx = req.body.category_idx;
    const title = req.body.category_idx;
    // const {writer_idx, date, thumbnail, hashtag, text, category_idx, title} = req.body

    const itemUpdateQuery = "UPDATE item SET date = ?, thumbnail = ?, hashtag = ?, text = ?, category_idx = ?, title = ? WHERE item_idx = ?"    
    const itemUpdateResult = await db.queryParam_Parse(itemUpdateQuery, [date , thumbnail, hashtag, text, category_idx, title, itemIdx]);

    if(!itemUpdateResult){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.POST_BAD_RESULT));
    }else{
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.SUCCESS_POST_ITEM, ItemUpdateResult));
    }
});

//계란찜 삭제하기
router.delete('/:item_idx', async(req, res) =>{

    const itemIdx = req.params.item_idx;
    const itemDeleteQuery = "Delete FROM item WHERE item_idx = ?"
    const itemDeleteResult = await db.queryParam_Parse(itemDeleteQuery, [itemIdx])

    if(!itemDeleteResult){
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.POST_BAD_RESULT));
    }else{
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.SUCCESS_POST_ITEM, ItemDeleteResult));
    }
});

/*
전체 목록 가져오기 GET
게시물 하나 가져오기 GET
게시물 등록하기 POST
게시물 수정하기 UPDATE
게시물 삭제하기 DELETE
*/



module.exports = router;