import {
    GET_STORAGE_DATA_ACTION,
    SET_STORAGE_DATA_ACTION,
    STORAGE_BILLING_PARAMETERS,
    STORAGE_LANGUAGE_CODE,
    STORAGE_SEARCH_PARAMETERS
} from "../utils/constants";
import Api from "./Api";

export default class Storage {
    static [STORAGE_BILLING_PARAMETERS];
    static [STORAGE_SEARCH_PARAMETERS];
    static [STORAGE_LANGUAGE_CODE];

    static get(name) {
        return Api.sendMessage(GET_STORAGE_DATA_ACTION, [name])
    }

    static set(name, value) {
        return Api.sendMessage(SET_STORAGE_DATA_ACTION, { [name]: value })
    }
}