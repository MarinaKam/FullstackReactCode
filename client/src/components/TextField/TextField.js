import React, { forwardRef } from 'react';
import { get } from 'lodash';
import cn from 'classnames';
import { makeStyles, TextField as MuiTextField } from '@material-ui/core';
import { useFormikField } from './useFormikField';
import { styles } from './styles';

const useStyles = makeStyles(styles);

export const TextField = forwardRef(({
  isEditable,
  disabled,
  zeroMinWidth,
  disableNumber = false,
  disableUnderline,
  withoutFormik,
  fullWidth = true,
  type = 'text',
  helperText,
  error: errorProp,
  name,
  value,
  onChange,
  InputProps = {},
  InputLabelProps = {},
  className,
  ...props
}, ref) => {
  const formikFieldProps = withoutFormik ? {} : useFormikField(name);
  const { isFormikField, fieldProps: [ field = {}, , { setValue } = {} ] = [], error } = formikFieldProps;
  const classes = useStyles({ zeroMinWidth });
  const hasIsEditable = typeof isEditable === 'boolean';

  const handleChange = (event) => {
    onChange && onChange(event);
    isFormikField && setValue(((type === 'number' && !disableNumber) ? +event.target.value : event.target.value) || null);
  };

  return (
    <MuiTextField
      {...field}
      fullWidth={fullWidth}
      disabled={(hasIsEditable && !isEditable) || disabled}
      error={!!error || errorProp}
      type={type}
      name={name}
      value={value || (type === 'number' ? `${field.value}` : field.value) || (type !== 'number' && '')}
      onChange={handleChange}
      helperText={error || errorProp || helperText}
      InputProps={{
        ...InputProps,

        classes: {
          ...get(InputProps, 'classes', {}),
          disabled: cn(
            hasIsEditable && classes.notEditableInput,
            (disabled && disableUnderline) && classes.disableInput,
            get(InputProps, 'classes.disabled')
          ),
          underline: disableUnderline && classes.underline
        }
      }}
      InputLabelProps={{
        ...InputLabelProps,

        classes: {
          ...get(InputLabelProps, 'classes', {}),
          disabled: cn(hasIsEditable && classes.notEditableInputLabel, get(InputLabelProps, 'classes.disabled'))
        }
      }}
      className={cn(classes.field, className)}
      {...props}
      ref={ref}
    />
  );
});
