import React from 'react';
import { makeStyles, SvgIcon as MuiSvgIcon } from '@material-ui/core';
import { styles } from './styles';

const useStyles = makeStyles(styles);

export const SvgIcon = ({ children, color, background, ...props }) => {
  const classes = useStyles({ color });

  return (
    <MuiSvgIcon classes={classes} {...props}>
      {children}
    </MuiSvgIcon>
  );
};
