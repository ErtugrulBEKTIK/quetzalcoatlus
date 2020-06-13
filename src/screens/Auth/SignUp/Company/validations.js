import * as Yup from "yup";

const validations = Yup.object().shape({
  companyName: Yup
    .string()
    .required('Gerekli'),
  username: Yup
    .string()
    .required('Gerekli'),
  email: Yup
    .string()
    .email()
    .required('Gerekli'),
  phoneNumber: Yup
    .string()
    .required('Gerekli'),
  password: Yup
    .string()
    .required('Gerekli'),
  companyTypeId: Yup
    .number()
    .required('Gerekli'),
  terms: Yup
    .boolean()
    .oneOf([true], "Must Accept Terms of Service")
});

module.exports = validations;
