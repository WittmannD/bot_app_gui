import React from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import {StyledFormCheckbox} from "./StyledComponents/StyledForm";

export const FormCheckbox = ({ label, control, name, rules }) => {
    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field, formState, fieldState }) => (
                <StyledFormCheckbox
                    label={label}
                    checked={field.value}
                    onChange={(e, { checked }) => {
                        field.onChange(checked);
                    }}
                    name={field.name}
                    ref={null}
                />
            )}
        />
    );
};
