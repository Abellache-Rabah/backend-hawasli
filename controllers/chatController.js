const { jwtverify } = require("../middlewares/jwt");
const { ChatModel } = require("../models/chatModel");
const { Comment } = require("../models/commentModel");
const { ConsummerModel } = require("../models/consummerModel");
const { MsgModel } = require("../models/msgModel");
const { WorkerModel } = require("../models/workerModel");
const { sendSchema } = require("../utils/validation/joi");

module.exports.getMsg= async (req, res) => {
 try{
  const { idUser } = req.body;
  if (!idUser) {
    return res.status(404).send("Id user is require");
  }
  const email = req.email;
  const user =
    (await ConsummerModel.findOne({ email })) ||
    (await WorkerModel.findOne({ email }));

  const userTo =
    (await WorkerModel.findById(idUser)) ||
    (await ConsummerModel.findById(idUser));

  if (!userTo || !user)
    return res.status(400).send("can't found a distanation!");

  let chat =
    (await ChatModel.findOne({ idUser: user._id, idUser2: userTo._id })) ||
    await ChatModel.findOne({ idUser: userTo._id, idUser2: user._id });
  if (!chat) {
    chat = new ChatModel({
      idUser: user,
      idUser2: userTo,
    });
    await chat.save();
  }
  const allMsg = await Promise.all(
    chat.msgsIds.map(async (e) => await MsgModel.findById(e))
  );
  res.status(200).send(allMsg);
 }catch (err){
  res.status(500).send(err);
 }
}


module.exports.sendMsg= async (req, res) => {
  try {
    const {error} = sendSchema.validate(req.body)
    if (error) return res.status(400).send(error);
    const { idUser, msg } = req.body;
    
  
    if (!idUser) {
      return res.status(404).send("Id user is require");
    }
    const email = req.email;
    const user =
      (await ConsummerModel.findOne({ email })) ||
      (await WorkerModel.findOne({ email }));
  
    const userTo =
      (await WorkerModel.findById(idUser)) ||
      (await ConsummerModel.findById(idUser));
  
    if (!userTo || !user)
      return res.status(400).send("can't found a distanation!");
  
    let chat =
      (await ChatModel.findOne({ idUser: user._id, idUser2: userTo._id })) ||
      (await ChatModel.findOne({ idUser: userTo._id, idUser2: user._id }));
    if (!chat) {
      chat = new ChatModel({
        idUser: user,
        idUser2: userTo,
      });
    }
    const createMsg = new MsgModel({
      idUser: user._id,
      idUserTo: userTo._id,
      msg,
    });
    await createMsg.save();
    chat.msgsIds.push(createMsg._id);
    await chat.save();
    res.status(200).send(createMsg);
  }catch (err) {
    res.status(500).send(err);
  }
  
}



module.exports.getChat= async (req, res) => {
  const email = req?.email
  const user =  (await ConsummerModel.findOne({ email })) || (await WorkerModel.findOne({ email }));
  if (!user)  return res.status(404).send( "user not found" );
  let chat = (await ChatModel.findOne({ idUser: user._id})) || (await ChatModel.findOne({ idUser2: user._id }));
  res.status(200).send(chat)
};
