import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { Box, Button } from '@material-ui/core';
import { mdiEmailCheckOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { SvgIcon } from '../../SvgIcon';
import { TextField } from '../../TextField';
import { Loader } from '../../Loader';
import { fields } from '../fields';

export const View = ({ onToggleNext }) => {
  const { values, isSubmitting } = useFormikContext();

  return (
    <>
      <Box flexGrow={1}>
        {fields.map((item, i) => (
          <Box key={i} mb={2}>
            <TextField
              disabled
              disableUnderline
              name={item.name}
              label={item.label}
              margin="dense"
            />
          </Box>
        ))}

        <FieldArray
          name="recipients"
          render={() => (
            values?.recipients?.map((recipient, i) => (
              <Box key={i} display="flex" alignItems="center" justifyContent="space-between">
                <TextField
                  disabled
                  disableUnderline
                  name={`recipients[${i}].email`}
                  label="Recipient"
                  margin="dense"
                />
              </Box>
            ))
          )}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" mt={4}>
        <Box mr={2}>
          <Button color="secondary" onClick={onToggleNext}>
            Back
          </Button>
        </Box>

        <Loader surface loading={isSubmitting} render={
          () => (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SvgIcon><Icon path={mdiEmailCheckOutline} /></SvgIcon>}
            >
              Send Survey
            </Button>
          )}
        />
      </Box>
    </>
  );
};
