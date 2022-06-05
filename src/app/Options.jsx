import React, { useContext, useEffect, useState } from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Header } from './components/Header';
import { BillingForm } from './components/BillingForm';
import { SearchParametersForm } from './components/SearchParametersForm';
import JSONKeywordsEditor from './components/JSONKeywordsEditor';
import { StyledTabContainer, StyledTabPane } from './components/StyledComponents/StyledTabs';
import Background from '../api/Background';
import {STATUS_SUCCESS, STORAGE_BILLING_PARAMETERS, STORAGE_SEARCH_PARAMETERS} from '../utils/constants';
import { Context } from '../index';
import { StyledContainer } from './components/StyledComponents/StyledContainer';

export const Options = () => {
    const { t, i18n } = useTranslation('common');
    const searchParametersFormState = useForm({
        defaultValues: {
            keywords: [{}],
            additional: {
                enable_auto_payment: true,
                disable_loading_images: true,
                use_timer: true,
            },
            sizes: {
                s: true,
                m: true,
                l: true,
                xl: true,
            },
        },
    });
    const [isLoading, setIsLoading] = useState(true);

    const billingFormState = useForm({
        defaultValues: {
            credit_card: {
                country: '-',
                card_month: '01',
                card_year: '2022',
            },
        },
    });

    const changeLanguage = async (lng) => {
        await i18n.changeLanguage(lng);
        await Background.setLanguage(lng);
    };

    useEffect(() => {
        Background.getBillingParameters()
            .then(({ content, status }) => {
                if (status === STATUS_SUCCESS && content) {
                    const {[STORAGE_BILLING_PARAMETERS]: data} = content

                    !!data && billingFormState.reset(data);
                }

                setIsLoading(false);
            });

        Background.getSearchParameters()
            .then(({ content, status }) => {
                if (status === STATUS_SUCCESS && content) {
                    const {[STORAGE_SEARCH_PARAMETERS]: data} = content

                    !!data && searchParametersFormState.reset(data);
                }

                setIsLoading(false);
            });

    }, []);

    const [activeTabIndex, setActiveTabIndex] = useState(1);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [jsonView, setJsonView] = useState(false);

    const onSubmit = async (data, e) => {
        const { content } = await Background.getBillingParameters();
        const { [STORAGE_BILLING_PARAMETERS]: billing } = content;

        if (data && data.keywords && data.keywords.length !== 0) {
            if (!!billing) {
                await Background.setSearchParameters(data);

                if (data.additional.use_timer) {
                    await Background.openCountdownPage();

                } else {
                    const category = data.keywords[0].category;
                    await Background.openTargetPage(category);
                }
            } else {

                setActiveTabIndex(1);
                await billingFormState.trigger();
            }
        }
    };

    const openOptionsPage = async () => {
        await Background.openOptionsPage();
    };

    const panes = [
        {
            render: () => (
                <StyledTabPane loading={isLoading}>
                    {isLoading ? null :
                        !jsonView ? (
                            <FormProvider {...searchParametersFormState}>
                                <SearchParametersForm setJsonView={setJsonView} onSubmit={onSubmit} />
                            </FormProvider>
                        ) : (
                            <JSONKeywordsEditor
                                getValues={searchParametersFormState.getValues}
                                setValue={searchParametersFormState.setValue}
                                setJsonView={setJsonView}
                            />
                        )}
                </StyledTabPane>
            ),
            index: 0,
        },
        {
            render: () => (
                <StyledTabPane loading={isLoading}>
                    <FormProvider {...billingFormState}>
                        <BillingForm />
                    </FormProvider>
                </StyledTabPane>
            ),
            index: 1,
        },
    ];

    const { isPopup } = useContext(Context);

    return !isPopup ? (
        <StyledContainer basic>
            <Header />
            <StyledTabContainer>
                <Menu attached='top' tabular size={'small'}>
                    <Menu.Item
                        active={activeTabIndex === 0}
                        onClick={() => setActiveTabIndex(0)}
                    >
                        {t('tabs.search_parameters').toUpperCase()}
                    </Menu.Item>
                    <Menu.Item
                        active={activeTabIndex === 1}
                        onClick={() => setActiveTabIndex(1)}
                    >
                        {t('tabs.billing_shipping_settings').toUpperCase()}
                    </Menu.Item>

                    <Menu.Item position={'right'} onClick={() => setActiveTabIndex(1)}>
                        <Icon name={'sign-out'} /> {t('sidebar.logout')}
                    </Menu.Item>
                </Menu>
                {
                    panes[activeTabIndex].render()
                }
            </StyledTabContainer>
        </StyledContainer>
    ) : (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation='overlay'
                onHide={() => setSidebarVisible(false)}
                visible={sidebarVisible}
                vertical
            >
                <Menu.Item>
                    <Header />
                </Menu.Item>
                <Menu.Item onClick={openOptionsPage}>
                    {t('sidebar.settings')}
                </Menu.Item>
                <Menu.Item as='a'><Icon name={'sign-out'} />{t('sidebar.logout')}</Menu.Item>

                <Menu.Item>
                    <Icon name={'language'} />{t('sidebar.language')}
                    <Menu.Menu>
                        <Menu.Item active={i18n.language === 'en'}
                                   onClick={() => changeLanguage('en')}>English</Menu.Item>

                        <Menu.Item as={'a'}>French</Menu.Item>

                        <Menu.Item active={i18n.language === 'ru'}
                                   onClick={() => changeLanguage('ru')}>Русский</Menu.Item>

                        <Menu.Item as={'a'}>Українська</Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarVisible} as={StyledContainer} basic>
                <Menu attached='top' tabular size={'small'}>
                    <Menu.Item
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                        icon={'bars'}
                    />
                    <Menu.Item
                        active={true}
                        onClick={() => {
                        }}
                    >
                        {t('tabs.search_parameters').toUpperCase()}
                    </Menu.Item>
                    <Menu.Item onClick={openOptionsPage}>
                        {t('tabs.billing_shipping_settings').toUpperCase()}
                    </Menu.Item>
                </Menu>
                {panes[0].render()}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};
