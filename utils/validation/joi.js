const Joi = require("joi");

const WorkerSchema = Joi.object({
  sex: Joi.string().required(),
  phone: Joi.string().required(),
  age: Joi.number().required(),
  wilaya: Joi.string().required(),
  baladia: Joi.string().required(),
  work: Joi.string().required(),
  bio: Joi.string().optional(),
  workTime: Joi.string().optional(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});

const ConsummerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  sex: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().required().min(8).max(50),
  age: Joi.number().optional(),
  wilaya: Joi.string().optional(),
  baladia: Joi.string().optional(),
});

const CommentSchema = Joi.object({
  idWorker: Joi.string().required(),
  content: Joi.string().required(),
  rating: Joi.number().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(50),
});
const PaymentSchema = Joi.object({
  paymentType: Joi.string().required(),
  price: Joi.number().required(),
  card: Joi.string().required(),
  ccp: Joi.string().required(),
});

const sendSchema = Joi.object({
  idUser: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("must be an oid")
    .required(),
  msg: Joi.string().required(),
});

module.exports = {
  PaymentSchema,
  WorkerSchema,
  CommentSchema,
  ConsummerSchema,
  loginSchema,
  sendSchema,
};
