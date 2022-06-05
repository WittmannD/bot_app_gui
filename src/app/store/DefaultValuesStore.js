import { makeAutoObservable } from 'mobx';

export default class defaultValuesStore {
    constructor() {
        this._backendProvidedOptions = {};
        makeAutoObservable(this);
    }

    get backendProvidedOptions() {
        return this._backendProvidedOptions;
    }

    setBackendProvidedOptions(options) {
        this._backendProvidedOptions = options;
    }
}
