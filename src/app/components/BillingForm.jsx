import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FieldGroup, FormButtonsGroup, StyledForm } from './StyledComponents/StyledForm';
import { Context } from '../../index';
import Background from '../../api/Background';
import { MessagesContainer } from './MessagesContainer';
import { useTranslation } from 'react-i18next';
import { billingFieldsRules } from '../../utils/validation';

const cardMonthOptions = [...Array(12).keys()].map((i) => {
    let month = String(i + 1).padStart(2, '0')

    return {
        key: month,
        value: month,
        text: month,
    }
});

const cardYearOptions = [...Array(11).keys()].map((i) => {
    let year = (i + +new Date().getFullYear()).toString();

    return {
        key: year,
        text: year,
        value: year,
    };
});

export const BillingForm = () => {
    const { control, handleSubmit } = useFormContext();
    const { t } = useTranslation('common');
    let { defaultOptions } = useContext(Context);
    defaultOptions = defaultOptions.backendProvidedOptions.billingForm;

    const [successMessages, setSuccessMessages] = useState([]);

    const onSubmit = async (data, e) => {
        if (data) {
            await Background.setBillingParameters(data)
            setSuccessMessages(prevState => [...prevState, {
                display: true,
                variant: 'success',
                message: 'messages.billing_form_saved',
                duration: 5000
            }])
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Grid columns={2} stackable style={{ flex: '1 1 auto' }}>
                <Grid.Column>
                    <Header size='tiny'>{t('form.billing_shipping_information')} </Header>
                    <FormInput
                        control={control}
                        name={'order[billing_name]'}
                        placeholder='full name'
                        rules={billingFieldsRules.order.billing_name}
                    />
                    <FormInput
                        control={control}
                        name={'order[email]'}
                        placeholder='email'
                        rules={billingFieldsRules.order.email}
                    />
                    <FormInput
                        control={control}
                        name={'order[tel]'}
                        placeholder='tel'
                        rules={billingFieldsRules.order.tel}
                    />
                    <FieldGroup unstackable>
                        <FormInput
                            control={control}
                            width={10}
                            name={'order[billing_address]'}
                            placeholder='address'
                            rules={billingFieldsRules.order.billing_address}
                        />
                        <FormInput
                            control={control}
                            width={6}
                            name={'order[billing_address_2]'}
                            placeholder='address2'
                            rules={billingFieldsRules.order.billing_address_2}
                        />
                    </FieldGroup>
                    <FormInput
                        control={control}
                        name={'order[billing_address_3]'}
                        placeholder='address3'
                        rules={billingFieldsRules.order.billing_address_3}
                    />
                    <FormInput
                        control={control}
                        name={'order[billing_city]'}
                        placeholder='city'
                        rules={billingFieldsRules.order.billing_city}
                    />
                    <FieldGroup unstackable>
                        <FormInput
                            control={control}
                            width={6}
                            name={'order[billing_zip]'}
                            placeholder='postcode'
                            rules={billingFieldsRules.order.billing_zip}
                        />
                        <FormSelect
                            control={control}
                            name={'order[billing_country]'}
                            options={defaultOptions.countries}
                            width={10}
                            compact
                            rules={billingFieldsRules.order.billing_country}
                        />
                    </FieldGroup>
                </Grid.Column>
                <Grid.Column>
                    <Header size='tiny'>{t('form.credit_card_information')} </Header>
                    <FormInput
                        control={control}
                        name={'credit_card[number]'}
                        placeholder='number'
                        as={NumberFormat}
                        type='text'
                        format={'#### #### #### ####'}
                        autoComplete={'off'}
                        rules={billingFieldsRules.credit_card.number}
                        errorLabelPosition='right center'
                    />
                    <FieldGroup unstackable>
                        <FormSelect
                            control={control}
                            options={cardMonthOptions}
                            name={'credit_card[month]'}
                            width={4}
                            compact
                            rules={billingFieldsRules.credit_card.month}
                        />
                        <FormSelect
                            control={control}
                            options={cardYearOptions}
                            name={'credit_card[year]'}
                            width={5}
                            compact
                            rules={billingFieldsRules.credit_card.year}
                        />
                        <Form.Field width={3} />
                        <FormInput
                            control={control}
                            name={'credit_card[verification_value]'}
                            placeholder='CVV'
                            autoComplete={'off'}
                            type='text'
                            width={4}
                            rules={billingFieldsRules.credit_card.verification_value}
                            errorLabelPosition='right center'
                        />
                    </FieldGroup>
                </Grid.Column>
            </Grid>

            <MessagesContainer successMessages={successMessages} />

            <FormButtonsGroup>
                <Button type='submit' primary floated='right'>
                    {t('buttons.save')}
                </Button>
            </FormButtonsGroup>
        </StyledForm>
    );
};
