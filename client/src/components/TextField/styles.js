export const styles = ({ palette: { grey }, typography: { pxToRem } }) => ({
  notEditableInput: {
    color: 'currentColor !important',

    '&:before': {
      borderBottomStyle: 'solid !important'
    }
  },

  notEditableInputLabel: {
    color: `${grey[500]} !important`
  },

  underline: {
    '&&&:before': {
      borderBottom: 'none'
    },

    '&&:after': {
      borderBottom: 'none'
    }
  },

  dropDownIcon: {
    fontSize: pxToRem(17)
  },

  field: {
    minWidth: ({ zeroMinWidth }) => zeroMinWidth ? 0 : 'inherit'
  }
});
