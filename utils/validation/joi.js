const Joi = require('joi');

const WorkerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  sex: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
  wilaya: Joi.string().required(),
  baladia: Joi.string().required(),
  work: Joi.string().required(),
  bio: Joi.string().optional(),
  workTime: Joi.string().optional(),

});

const ConsummerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  sex: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().required(),
  age: Joi.number().optional(),
  wilaya: Joi.string().optional(),
  baladia: Joi.string().optional(),
});

const CommentSchema = Joi.object({
    idConsumer: Joi.string().required(),
    idWorker: Joi.string().required(),
    content: Joi.string().required(),
    rating: Joi.number().required(),
  });



  const Joi = require('joi');

const PaymentSchema = Joi.object({
  paymentType: Joi.string().required(),
  price: Joi.number().required(),
  card: Joi.string().required(),
  ccp: Joi.string().required(),
});

module.exports ={ PaymentSchema, WorkerSchema , CommentSchema , ConsummerSchema }