import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import {Button, Divider, Label, Message, Popup} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

const StyledMessage = styled(Message)`
  font: normal 11px / 1.48em "Courier New", Courier, Monaco !important;

  margin: .5em 0 !important;

  & + ${Message} {
    margin-top: 0 !important;
  }
  
  & .divider {
    border-top-color: ${props => props.warning ? '#c9ba9b' : props.error ? '#e0b4b4' : 'inherit'} !important;
    color: ${props => props.warning ? '#c9ba9b' : props.error ? '#e0b4b4' : 'inherit'} !important;
    margin: 0.5em 0 !important;
  }
  
  & p {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const StyledPopup = styled(Popup)`
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
`


const FormMessage = ({ variant, display, name, text, duration }) => {
    duration = duration || false

    const [visible, setVisible] = useState(display)

    useEffect(() => {
        if (duration && typeof duration === 'number') {

            const timer = window.setTimeout(() => {
                setVisible(false)
            }, duration);

            return () => clearTimeout(timer);
        }
    })

    return (
        <StyledMessage {...{ [variant]: true }} visible={visible} >
            {text}
        </StyledMessage>
    )
}

const HiddenMessages = ({ variant, messages }) => {
    const { t } = useTranslation('common');
    const label = variant === 'warning' ? 'Warning' : variant === 'error' ? 'Error' : 'Message';
    const color = variant === 'warning' ? 'yellow' : variant === 'error' ? 'red' : 'green';

    return messages.length !== 0 ? (
        <StyledPopup
            trigger={
                <Label color={color} style={{cursor: 'pointer'}}>
                    + {messages.length} {messages.length === 1 ? label : label + 's'}
                </Label>
            }
            content={
                <StyledMessage visible {...{[variant]: true}}>
                    {messages
                        .map(message => <p key={message.ref.name}>{t(message.message)}</p>)
                        .reduce((prev, curr, i) => [prev, <Divider key={i}/>, curr])
                    }
                </StyledMessage>
            }
            wide='very'
            basic
        />
    ) : null
}


export const MessagesContainer = ({ warningRules, successMessages }) => {
    const { t } = useTranslation('common');
    const { formState, watch } = useFormContext();
    const [errorMessages, setErrorMessages] = useState([]);
    const [warningMessages, setWarningMessages] = useState([]);

    const messagesLimit = 3;

    const registerRule = (name, warningMessage, warningType) => {
        if (warningMessage && typeof warningMessage === 'string' && warningType) {

            setWarningMessages(prevState => {
                const newState = [...prevState];
                const index = newState.findIndex(o => o.type === warningType);

                if (index === undefined || index !== -1) {
                    newState[index].message = warningMessage;
                    newState[index].display = true;
                } else {
                    newState.push({
                        type: warningType,
                        message: warningMessage,
                        variant: 'warning',
                        display: true,
                        ref: { name },
                    });
                }

                return newState;
            });

        } else if (warningType && !warningMessage) {
            setWarningMessages(prevState => [...prevState.filter(o => o.type !== warningType)]);

        }

    };

    useEffect(() => {
        if (warningRules) {
            const subscription = watch(async (value, { name, type }) => {
                let warningMessage = '';
                let warningType = '';

                for (const rulesKey in warningRules) {
                    if (name && name.startsWith(rulesKey)) {
                        for (const type in warningRules[rulesKey]) {
                            warningType = [rulesKey, type].join('.');
                            warningMessage = await warningRules[rulesKey][type].validation(value[rulesKey]);

                            registerRule(name, warningMessage, warningType);
                        }
                    }
                }

            });


            return () => subscription.unsubscribe();
        }
    }, [watch]);

    useEffect(() => {
        if (!formState.errors)
            return;

        const _errorMessages = [];

        for (let errorKey in formState.errors) {
            if (!formState.errors[errorKey])
                continue;

            if (formState.errors[errorKey].ref === undefined) {
                for (let index in formState.errors[errorKey]) {
                    const error = formState.errors[errorKey][index]

                    if (!error)
                        continue;

                    const ref = error.ref.name !== undefined ? error.ref : { ...error.ref, name: `${errorKey}[${index}]` }

                    _errorMessages.push({ ...error, display: true, variant: 'error', ref });
                }
            } else {
                _errorMessages.push({ ...formState.errors[errorKey], display: true, variant: 'error' });
            }
        }

        setErrorMessages(_errorMessages);
    }, [formState]);

    const messagesToShow = [...errorMessages, ...warningMessages];
    const hiddenMessages = messagesToShow.splice(messagesLimit);
    const hiddenErrors = hiddenMessages.filter(o => o.variant === 'error');
    const hiddenWarnings = hiddenMessages.filter(o => o.variant === 'warning');

    return (
        <div>
            {successMessages.map((message, i) => (
                <FormMessage {...message} ref={null} text={t(message.message)} variant={'success'} key={i} />
            ))}
            {messagesToShow.map((message, i) => {
                const name = message.ref.name.replace(/(?<=\.)\d/g, i);
                return (
                    <FormMessage {...message} ref={null} text={t(message.message)} key={name} />
                );
            })}
            {hiddenMessages.length !== 0 && (
                <Label.Group size='tiny'>
                    {<HiddenMessages variant={'error'} messages={hiddenErrors} />}
                    {<HiddenMessages variant={'warning'} messages={hiddenWarnings} />}
                </Label.Group>
            )}
        </div>
    );
};
