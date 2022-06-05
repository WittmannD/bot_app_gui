import React, { Component } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { Button, Icon } from 'semantic-ui-react';
import { JsonEditorContainer, Wrapper } from './StyledComponents/StyledJsonEditor';

const validate = require('../../utils/options.schema.json');

export default class JSONKeywordsEditor extends Component {
    componentDidMount() {
        const { keywords } = this.props.getValues();
        const options = {
            mode: 'code',
            mainMenuBar: false,

            onChangeJSON: this.props.onChangeJSON,
            onValidate: function(json) {
                const errors = [];
                const isValid = validate(json);
                const ajvErrors = validate.errors;

                if (!isValid && ajvErrors.length) {
                    for (const ajvError of ajvErrors) {
                        const { instancePath, message } = ajvError;

                        const [, ...path] = instancePath.split('/');

                        errors.push({ path, message });
                    }
                }

                return errors;
            },
        };

        this.jsoneditor = new JSONEditor(this.container, options);
        this.jsoneditor.set(keywords);

        this.format = this.format.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillUnmount() {
        if (this.jsoneditor) {
            this.jsoneditor.destroy();
        }
    }

    componentDidUpdate() {
        const { keywords } = this.props.getValues();
        this.jsoneditor.update(keywords);
    }

    format = () => {
        if (this.jsoneditor) {
            this.jsoneditor.repair();
            this.jsoneditor.format();
        }
    };

    cancel = () => {
        this.props.setJsonView(false);
    };

    save = async () => {
        if (this.jsoneditor) {
            const error = await this.jsoneditor.validate();

            if (!error || error.length === 0) {
                const jsonObject = this.jsoneditor.get();

                if (jsonObject) {
                    this.props.setValue('keywords', jsonObject);
                    this.props.setJsonView(false);
                }
            }
        }
    };

    render() {
        return (
            <Wrapper>
                <div>
                    <Button
                        compact
                        size='small'
                        type='button'
                        onClick={this.cancel}
                        content={'Back'}
                        icon={<Icon name={'chevron left'} />}
                    />
                    <Button
                        compact
                        size='small'
                        type='button'
                        onClick={this.format}
                        content={'Repair & Format'}
                        icon={<Icon name={'quidditch'} />}
                        floated={'right'}
                    />
                </div>

                <JsonEditorContainer
                    className='jsoneditor-react-container'
                    ref={(elem) => (this.container = elem)}
                />

                <div>
                    <Button
                        size='small'
                        compact
                        secondary
                        type='button'
                        floated='right'
                        onClick={this.save}
                        icon={
                            <Icon name={'save'} />
                        }
                        content={'Save'}
                    />
                    <div style={{ clear: 'both' }} />
                </div>
            </Wrapper>
        );
    }
}
