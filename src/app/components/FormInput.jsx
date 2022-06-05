import React from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'semantic-ui-react';

export const FormInput = ({
                              control,
                              name,
                              as,
                              width,
                              rules,
                              ref,
                              errorLabelPosition,
                              ...props
                          }) => {
    const Component = as || 'input';

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, formState, fieldState }) => {
                const { error } = fieldState;
                return (
                    <Form.Field width={width} error={!!error}>
                        <Component {...props} {...field} value={field.value || ''} />
                    </Form.Field>
                );
            }}
        />
    );
};
