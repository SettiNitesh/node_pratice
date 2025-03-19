import Joi from "joi";

const createTodoSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("", null),
  completed: Joi.boolean().default(false),
});

const updateTodoSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow("", null),
  completed: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min":
      "At least one field (title, description or completed) is required for updating a todo.",
  });

export { createTodoSchema, updateTodoSchema };
