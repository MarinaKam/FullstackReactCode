export const DEFAULT_SPINNER_SIZE = 40;
export const DEFAULT_SPINNER_THICKNESS = 3.6;

export const styles = ({ palette }) => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    minHeight: (spinnerSize) => spinnerSize
  },

  root_surface: {
    width: ({ fullWidth }) => !fullWidth && 'auto',
    height: ({ fullHeight }) => fullHeight && '100%',

    '& $spinnerWrapper': {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  },

  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    height: ({ fullHeight }) => fullHeight && '100%',
    opacity: 0.6,
    filter: 'blur(3px)'
  },

  loader: {
    color: ({ color }) => palette[color] && palette[color].main
  }
});
