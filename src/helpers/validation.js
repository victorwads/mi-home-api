const handleValidation = (req, res, next) => {
  return req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        let errors = result.mapped()
        res.status(422).json(errors)
        return false
      } else {
        next()
      }
    })
    .catch((error) => {
      throw error
    })
}

export default handleValidation
