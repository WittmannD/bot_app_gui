import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'semantic-ui-react';


const getCurrentTime = () => new Date().toLocaleTimeString();

export const FormDatepicker = ({
                                   control,
                                   name,
                                   rules,
                                   errorLabelPosition,
                                   defaultValue,
                                   ...props
                               }) => {

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || getCurrentTime()}
            render={({ field, formState, fieldState }) => {
                const { error } = fieldState;
                return (
                    <Input
                        type={'time'}
                        error={!!error}
                        {...props}
                        {...field}
                        value={field.value || ''}
                        ref={null}

                        input={{
                            step: '1',
                        }}
                    />
                );
            }}
        />
    );
};
