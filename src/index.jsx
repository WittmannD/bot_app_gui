import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import './assets/semantic.css';

import DefaultValuesStore from './app/store/DefaultValuesStore';
import App from './app/App';

import common_ru from './translations/ru/common.json';
import common_en from './translations/en/common.json';

export const Context = createContext(null);

(async function() {
    await i18next.init({
        interpolation: { escapeValue: false },
        lng: 'en',
        resources: {
            en: {
                common: common_en,
            },
            ru: {
                common: common_ru,
            },
        },
    });

    const windows = [];

    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(
        <I18nextProvider i18n={i18next}>
            <Context.Provider
                value={{
                    isPopup: windows.length !== 0,
                    defaultOptions: new DefaultValuesStore(),
                }}
            >
                <App />
            </Context.Provider>
        </I18nextProvider>
    )

})().then()

