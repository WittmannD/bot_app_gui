import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Dropdown, Label } from 'semantic-ui-react';

import { Context } from '../../index';
import { keywordsRules } from '../../utils/validation';

const getDefined = (collection) => {
    let result = [];
    if (!Array.isArray(collection) && typeof collection === 'object' && collection !== null && collection !== undefined) {
        collection.category && result.push(collection.category);
        collection.item && result.push(collection.item);
        collection.colour && result.push(collection.colour);
    } else if (Array.isArray(collection) && collection !== null) {
        result = collection.filter(o => !!o);
    }

    return result;
};

const renderLabel = (item, index, props) => {
    let { onRemove, onClick, active, ...labelProps } = props;

    const { text } = item;

    return (
        <Label {...labelProps} active={false} onClick={null} style={{fontWeight: '600'}} as={'span'}>
            {text}
        </Label>
    );
};

export const _KeywordsSelector = ({ field, defaultOptions }) => {
    const [settings, setSettings] = useState({
        category: {
            allowAdditions: false,
            closeOnChange: false,
            placeholder: 'category',
            minCharacters: 1,
            options: defaultOptions.category || [],
        },
        item: {
            allowAdditions: true,
            closeOnChange: false,
            placeholder: 'item name',
            minCharacters: 2,
            options: defaultOptions.item || [],
        },
        colour: {
            allowAdditions: true,
            closeOnChange: true,
            placeholder: 'colour',
            minCharacters: 2,
            options: defaultOptions.colour || [],
        },
        end: {
            allowAdditions: false,
            closeOnChange: true,
            placeholder: '',
            minCharacters: 10,
            options: [],
        },
    });
    const [currentInput, setCurrentInput] = useState('category');
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        let { value } = field;

        if (value) {
            onChange(null, { value });
        }

        return () => {
            setCurrentInput('category');
            setSelectedOptions([]);
        };
    }, []);

    useEffect(() => {
        let { value: values } = field;

        values = getDefined(values);
        let keys = Object.keys(settings);
        let index = Math.min(values.length, keys.length - 1);

        setSelectedOptions(
            values.map((val) => ({ key: val, text: val, value: val })),
        );
        setCurrentInput(keys[index]);

    }, [field.value]);

    const onChange = (event, { value: values }) => {
        values = getDefined(values);

        const [category, item, colour] = values;
        field.onChange({ category, item, colour });
    };

    const onAddItem = (event, data) => {
        if (settings[currentInput].allowAdditions)
            setSettings((prevState) => ({
                ...prevState,
                [currentInput]: {
                    ...prevState[currentInput],
                    options: [
                        ...prevState[currentInput].options,
                        { key: data.value, text: data.value, value: data.value },
                    ],
                },
            }));
    };

    const mergeWithoutDuplicates = (a, b) => {
        const ids = new Set(a.map((d) => d.key));
        return [...a, ...b.filter((d) => !ids.has(d.key))];
    };

    return (
        <Dropdown
            search
            selection
            multiple
            icon={false}
            options={mergeWithoutDuplicates(
                selectedOptions,
                settings[currentInput].options,
            )}
            placeholder={' '}
            allowAdditions={settings[currentInput].allowAdditions}
            closeOnChange={settings[currentInput].closeOnChange}
            minCharacters={settings[currentInput].minCharacters}
            onAddItem={onAddItem}
            value={getDefined(field.value)}
            renderLabel={renderLabel}
            onChange={onChange}
            searchInput={{
                readOnly: currentInput === 'end',
                placeholder: settings[currentInput].placeholder,
                style: {
                    minWidth: `${settings[currentInput].placeholder.length + 1}ch`,
                },
            }}
            id={field.name || ''}
        />
    );
};

export const KeywordsSelector = ({
                                     name,
                                     control,
                                     defaultValue,
                                     errorLabelPosition,
                                 }) => {
    let { defaultOptions } = useContext(Context);
    defaultOptions = defaultOptions.backendProvidedOptions.keywordsSelector;

    return (
        <Controller
            name={name}
            rules={keywordsRules}
            control={control}
            render={({ field }) => {

                return (
                    // eslint-disable-next-line react/jsx-pascal-case
                    <_KeywordsSelector
                        field={field}
                        defaultOptions={defaultOptions}
                    />
                );
            }}
        />
    );
};
