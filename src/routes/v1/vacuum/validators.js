import handleValidation from '@helpers/validation'

export default {
  checkFields: (req, res, next) => {
    req.checkBody('repeats', { error: 'required' }).notEmpty()
    req.checkBody('zone', { error: 'required' }).notEmpty()
    handleValidation(req, res, next)
  }
}
