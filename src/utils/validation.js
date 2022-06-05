
let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index);
export const warningRules = {
    keywords: {
        duplicates: {
            validation: async (value) => {
                const duplicates = findDuplicates(value.map(o => o.item).filter(o => !!o));

                if (duplicates && duplicates.length !== 0) {
                    return 'errors.keywords_duplicates';
                }

                return false;
            },
        },
        empty: {
            validation: async (value) => value && value.length !== 0 ? false : 'errors.keywords_empty',

        },
    },
    sizes: {
        empty: {
            validation: async (value) => Object.values(value).filter(o => !!o).length !== 0 ? false : 'errors.sizes_empty',
        },
    },
};

export const keywordsRules = {
    required: true,
    validate: {
        categoryIsMissing: (v) => {
            if (!v.category)
                return 'errors.keywords_category_is_missing';

            return true;
        },
        itemIsMissing: (v) => {
            if (!v.item)
                return 'errors.keywords_item_is_missing';

            return true;
        },
        colourIsMissing: (v) => {
            if (!v.colour)
                return 'errors.keywords_colour_is_missing';

            return true;
        },
    },
}

export const billingFieldsRules = {
    order: {
        billing_name: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        email: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        tel: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        billing_address: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        billing_address_2: {
            required: false,
        },
        billing_address_3: {
            required: false,
        },
        billing_zip: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        billing_city: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        billing_country: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
    },
    credit_card: {
        number: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
            setValueAs: (v) => v.trim(),
        },
        month: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        year: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
        },
        verification_value: {
            required: {
                value: true,
                message: 'errors.required_field',
            },
            minLength: {
                value: 3,
                message: 'errors.verification_value_min_length'
            },
            maxLength: {
                value: 4,
                message: 'errors.verification_value_max_length'
            }
        },
    }
};
