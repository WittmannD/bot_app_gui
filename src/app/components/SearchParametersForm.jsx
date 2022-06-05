import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Form, Header } from 'semantic-ui-react';

import { FormButtonsGroup, StyledForm, ToggleGroup } from './StyledComponents/StyledForm';
import { FormCheckbox } from './FormCheckbox';
import { FormToggle } from './FormToggle';
import { KeywordsList } from './KeywordsList';
import { FormDatepicker } from './FormDatepicker';
import { MessagesContainer } from './MessagesContainer';
import { warningRules } from '../../utils/validation';
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";

export const SearchParametersForm = ({ setJsonView, onSubmit }) => {
    const { control, handleSubmit, watch } = useFormContext();
    const { t } = useTranslation('common');

    const useTimer = watch('additional.use_timer')
    const [successMessages, setSuccessMessages] = useState([]);

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <FormCheckbox
                    control={control}
                    label={t('form.enable_auto_payment')}
                    name='additional.enable_auto_payment'
                />
                <FormCheckbox
                    control={control}
                    label={t('form.disable_loading_images')}
                    name='additional.disable_loading_images'
                />
                <FormCheckbox
                    control={control}
                    label={t('form.use_timer')}
                    name='additional.use_timer'
                />
            </Form.Group>

            <Header size='tiny'>{t('form.sizes')} </Header>
            <ToggleGroup>
                <FormToggle size='tiny' control={control} name='sizes.s' label={'S'} />
                <FormToggle size='tiny' control={control} name='sizes.m' label={'M'} />
                <FormToggle size='tiny' control={control} name='sizes.l' label={'L'} />
                <FormToggle
                    size='tiny'
                    control={control}
                    name='sizes.xl'
                    label={'XL'}
                />
            </ToggleGroup>

            <Header size='tiny'>{t('form.keywords_list')} </Header>
            <KeywordsList setJsonView={setJsonView} />

            <MessagesContainer successMessages={successMessages} warningRules={warningRules} />

            <FormButtonsGroup>
                {useTimer &&
                    <label>
                        <span style={{ marginRight: '0.5em' }}>{t('form.start_at')} </span>
                        <FormDatepicker
                            control={control}
                            size={'small'}
                            name={'start_time'}
                            rules={{
                                required: true,
                                valueAsDate: true,
                                validate: {
                                    elapsedTime: v => {
                                        let isValid = false;
                                        let now = new Date();

                                        const [h, m, s] = v.split(':')
                                        const date = dayjs().hour(h).minute(m).second(s).toDate();

                                        isValid = date > now;

                                        return isValid ? true : (
                                            'errors.set_elapsed_time'
                                        );
                                    }
                                }
                            }}
                        />
                    </label>
                }
                <Button type='submit' primary>
                    {t('buttons.start')}
                </Button>
            </FormButtonsGroup>
        </StyledForm>
    );
};
