import * as Yup from "yup";

const validations = Yup.object().shape({
  name: Yup
    .string()
    .required('Gerekli'),
  surname: Yup
    .string()
    .required('Gerekli'),
  username: Yup
    .string()
    .required('Gerekli'),
  email: Yup
    .string()
    .email()
    .required('Gerekli'),
  password: Yup
    .string()
    .required('Gerekli'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor.')
    .required()
});

module.exports = validations;