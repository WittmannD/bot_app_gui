let EXTENSION_ID;

try {
    EXTENSION_ID = process.env.REACT_APP_EXTENSION_ID
} catch (e) {
    EXTENSION_ID = null
}

export default class Api {
    static sendMessage(action, content) {
        return new Promise(resolve =>
            chrome.runtime.sendMessage(EXTENSION_ID, {
                action: action,
                content: content,
            }, (data) => {
                resolve(data);
            }),
        );
    }
}