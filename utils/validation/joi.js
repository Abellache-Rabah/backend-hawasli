const Joi = require("joi");

const WorkerSchema = Joi.object({
  sex: Joi.string().valid("female", "male").required(),
  phone: Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/)
  .optional(),
  age: Joi.number().min(18).required(),
  wilaya: Joi.string().required(),
  baladia: Joi.string().required(),
  work: Joi.string().required(),
  bio: Joi.string().max(150).optional(),
  workTime: Joi.string().optional(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});

const ConsummerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  sex: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
  password: Joi.string().required().min(8).max(50),
  age: Joi.number().min(10).optional(),
  wilaya: Joi.string().optional(),
  baladia: Joi.string().optional(),
});

const CommentSchema = Joi.object({
  idWorker: Joi.string().required(),
  content: Joi.string().max(100).required(),
  rating: Joi.number().min(0).max(5).required(),
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

const UpdateWorkerSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  sex: Joi.string().valid("female","male"),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
  age: Joi.number(),
  wilaya: Joi.string(),
  baladia: Joi.string(),
  work: Joi.string(),
  bio: Joi.string().max(150).optional(),
  workTime: Joi.string().optional(),
  latitude: Joi.string(),
  longitude: Joi.string(),
});
module.exports = {
  PaymentSchema,
  WorkerSchema,
  CommentSchema,
  ConsummerSchema,
  loginSchema,
  sendSchema,
  UpdateWorkerSchema,
};
