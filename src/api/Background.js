import {
    GET_BACKEND_PROVIDED_OPTIONS,
    GET_STORAGE_DATA_ACTION,
    OPEN_COUNTDOWN_PAGE_ACTION,
    OPEN_TARGET_PAGE_ACTION,
    PROCESS_ACTION,
    STORAGE_BILLING_PARAMETERS,
    STORAGE_LANGUAGE_CODE,
    STORAGE_SEARCH_PARAMETERS,
} from '../utils/constants';
import Api from "./Api";
import Storage from "./Storage";

export default class Background {

    static getBackendProvidedOptions() {
        return Api.sendMessage(GET_BACKEND_PROVIDED_OPTIONS);
    }

    static process() {
        return Api.sendMessage(PROCESS_ACTION);
    }

    static setBillingParameters(data) {
        return Storage.set(STORAGE_BILLING_PARAMETERS, data);
    }

    static getBillingParameters() {
        return Storage.get(STORAGE_BILLING_PARAMETERS);
    }

    static setSearchParameters(data) {
        return Storage.set(STORAGE_SEARCH_PARAMETERS, data)
    }

    static getSearchParameters() {
        return Storage.get(STORAGE_SEARCH_PARAMETERS);
    }

    static openOptionsPage() {
        const url = chrome.runtime.getURL('options.html');
        return chrome.tabs.create({ url, active: true });
    }

    static openTargetPage(category, newTab = true) {
        return Api.sendMessage(OPEN_TARGET_PAGE_ACTION, { category, newTab });
    }

    static openCountdownPage() {
        return Api.sendMessage(OPEN_COUNTDOWN_PAGE_ACTION);
    }

    static setLanguage(lng) {
        return Storage.set(STORAGE_LANGUAGE_CODE, lng);
    }

    static getLanguage() {
        return Storage.get(STORAGE_LANGUAGE_CODE);
    }
}