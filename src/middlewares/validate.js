export const validate = (schema) => {
  return (req, res, next) => {
    // Validate the request body against a Joi schema
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
      allowUnknown: false,
    });

    if (!error) return next();

    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message.replace(/"/g, ""),
    }));

    return res.status(400).send({
      status: "error",
      message: "Validation error",
      errors,
    });
  };
};
