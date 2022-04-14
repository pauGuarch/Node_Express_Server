import Router from 'express';
import HttpError from 'http-errors';
import messagesapp from "../data/messages.js";


const router = Router();

router.all('/',(req,res,next)=>next(HttpError(404,{message:messagesapp.router_error})));

export default router;