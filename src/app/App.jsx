import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Context } from '../index';
import { Options } from './Options';
import Background from '../api/Background';
import { STORAGE_LANGUAGE_CODE } from '../utils/constants';

const AppContainer = styled.div`
  min-width: 500px;
  min-height: 600px;
`;

const App = observer(() => {
    const { defaultOptions, isPopup } = useContext(Context);
    const [load, setLoad] = useState(true);
    const { i18n } = useTranslation('common');

    const loadData = async () => {
        let { content: options } = await Background.getBackendProvidedOptions();
        defaultOptions.setBackendProvidedOptions(options);

        let { content } = await Background.getLanguage();
        const { [STORAGE_LANGUAGE_CODE]: lng } = content;

        if (lng) {
            await i18n.changeLanguage(lng);
        }

        setLoad(false);
    };


    useEffect(() => {
        loadData().then();

        return () => {
            setLoad(true);
        };
    }, []);

    return (
        <AppContainer isPopup={isPopup}>
            {!load ? (
                <Options />
            ) : (
                <Dimmer active>
                    <Loader size='mini'>Loading</Loader>
                </Dimmer>
            )}
        </AppContainer>
    );
});

export default App;
