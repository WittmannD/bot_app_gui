import React from 'react';
import { Controller } from 'react-hook-form';
import { Form, Select } from 'semantic-ui-react';

export const FormSelect = ({ control, name, width, rules, ...props }) => {
    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field, formState, fieldState }) => {
                return (
                    <Form.Field width={width}>
                        <Select
                            {...props}
                            {...field}
                            onChange={(e, { value }) => field.onChange(value)}
                            ref={null}
                        />
                    </Form.Field>
                );
            }}
        />
    );
};
