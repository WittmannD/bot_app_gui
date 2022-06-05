import React from 'react';
import { Button } from 'semantic-ui-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { KeywordsSelector } from './KeywordsSelector';
import { KeywordsButtonGroup, KeywordsField, KeywordsGroup } from './StyledComponents/StyledForm';

export const KeywordsList = ({ setJsonView }) => {
    const { t } = useTranslation('common');
    const { control, formState } = useFormContext();
    const { fields, append, insert, remove } = useFieldArray({
        control,
        name: 'keywords',
    });

    const isInvalidField = (index) => {
        if (formState.errors.keywords) {
            for (let i = 0; i < formState.errors.keywords.length; i++) {
                const error = formState.errors.keywords[i];

                if (!!error && i === index) return true;
            }
        }

        return false;
    };

    const insertField = (index) => insert(index, {});
    const removeField = (index) => remove(index);
    const resetFields = () => {
        remove();
        append({});
    };
    const addField = () => append({});

    return (
        <>
            <KeywordsGroup>
                {fields.map((field, index) => {
                    const name = `keywords.${index}`;
                    return (
                        <KeywordsField error={isInvalidField(index)} key={field.id}>
                            <KeywordsSelector
                                name={name}
                                control={control}
                                defaultValue={field}
                            />

                            <Button
                                basic
                                icon={'minus'}
                                onClick={() => removeField(index)}
                                type={'button'}
                            />
                            <Button
                                basic
                                icon={'plus'}
                                onClick={() => insertField(index + 1)}
                                type={'button'}
                            />
                        </KeywordsField>
                    );
                })}
            </KeywordsGroup>
            <KeywordsButtonGroup>
                <Button type={'button'} size='small' onClick={resetFields} compact>
                    {t('buttons.reset')}
                </Button>
                <Button type={'button'} size='small' onClick={addField} compact>
                    {t('buttons.add')}
                </Button>
                <Button
                    type={'button'}
                    size='small'
                    onClick={() => setJsonView(true)}
                    compact
                    floated='right'
                >
                    {t('buttons.edit_as_json')}
                </Button>
            </KeywordsButtonGroup>
        </>
    );
};
