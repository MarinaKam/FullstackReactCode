import { Yup } from '../../utils/validation';

export const validationSchema = Yup.object().shape({
  title: Yup.string().nullable().required(),
  subject: Yup.string().nullable().required(),
  body: Yup.string().nullable().required(),
  recipients: Yup.array().of(Yup.string().email().nullable().required())
});
