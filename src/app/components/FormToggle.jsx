import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from 'semantic-ui-react';

export const FormToggle = ({ label, control, name, ...props }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState, fieldState }) => {
                return (
                    <Button
                        {...props}
                        active={field.value}
                        as='label'
                        basic={!field.value}
                        secondary={field.value}
                    >
                        {label}
                        {
                            <input
                                {...field}
                                defaultChecked={field.value}
                                type='checkbox'
                                hidden
                            />
                        }
                    </Button>
                );
            }}
        />
    );
};
