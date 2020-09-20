import { get } from 'lodash';
import { useFormikContext, useField } from 'formik';

export const useFormikField = (nameOrOptions) => {
  const formik = useFormikContext();
  const isFormikField = !!formik;
  const name = typeof nameOrOptions === 'object' ? nameOrOptions.name : nameOrOptions;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fieldProps = isFormikField ? useField(nameOrOptions) : [ {}, {}, {} ];

  return {
    isFormikField,
    fieldProps,
    error: get(formik, `errors.${name}`, false)
  };
};
