import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { Box, Button, IconButton, SvgIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { TextField } from '../../TextField';
import { fields } from '../fields';

export const Body = ({ onToggleNext }) => {
  const { values, dirty, errors, isSubmitting } = useFormikContext();

  return (
    <>
      <Box flexGrow={1}>
        {fields.map((item, i) => (
          <Box key={i} mb={2}>
            <TextField
              name={item.name}
              label={item.label}
              margin="dense"
            />
          </Box>
        ))}

        <FieldArray
          name="recipients"
          render={({ remove, push }) => (
            <>
              {values?.recipients?.map((recipient, i) => (
                <Box key={i} display="flex" alignItems="center" justifyContent="space-between">
                  <TextField
                    name={`recipients[${i}].email`}
                    label="Recipient"
                    margin="dense"
                  />

                  {values?.recipients?.length > 1 &&
                    <IconButton
                      size="small"
                      onClick={() => remove(i)}
                    >
                      <SvgIcon color="error">
                        <CloseIcon />
                      </SvgIcon>
                    </IconButton>
                  }
                </Box>
              ))}

              <Box py={2}>
                <Button
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => push({ email: null })}
                >
                  Add recipient
                </Button>
              </Box>
            </>
          )}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" mt={4}>
        <Box mr={2}>
          <Button
            color="secondary"
            component={Link}
            to="/surveys"
          >
            Cancel
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          disabled={!dirty || isSubmitting || !!Object.keys(errors).length}
          onClick={onToggleNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
