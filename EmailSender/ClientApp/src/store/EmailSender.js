"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseType;
(function (ResponseType) {
    ResponseType[ResponseType["OK"] = 0] = "OK";
    ResponseType[ResponseType["Error"] = 1] = "Error";
})(ResponseType || (ResponseType = {}));
exports.actionCreators = {
    sendEmailMessage: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.emailSender /*&& appState.emailSender.isMessageValid*/) {
            dispatch({ type: 'SET_IS_SENDING', value: true });
            var request = new Request('api/message', {
                method: 'POST', body: JSON.stringify({
                    sender: { email: appState.emailSender.sender, name: '' },
                    recipients: appState.emailSender.recipients.split(";").map(function (r) { return ({ email: r, name: '' }); }),
                    subject: appState.emailSender.subject,
                    body: appState.emailSender.body
                })
            });
            request.headers.set('Content-Type', 'application/json');
            return fetch(request)
                .then(function (response) { return response.json(); }, function (error) { return dispatch({ type: 'SET_RESPONSE_TYPE', value: ResponseType.Error }); })
                .then(function (data) {
                console.log(data);
                dispatch({ type: 'SET_IS_SENDING', value: false });
                dispatch({ type: 'SET_RESPONSE_TYPE', value: ResponseType.OK });
                dispatch({ type: 'SET_RESPONSE', value: JSON.stringify(data) });
            });
        }
    }; },
    setSender: function (sender) { return function (dispatch, getState) {
        dispatch({ type: 'SET_SENDER', sender: sender });
    }; },
    setRecipients: function (recipients) { return function (dispatchEvent, getState) {
        dispatchEvent({ type: 'SET_RECIPIENTS', recipients: recipients });
    }; },
    setSubject: function (subject) { return function (dispatchEvent, getState) {
        dispatchEvent({ type: 'SET_SUBJECT', subject: subject });
    }; },
    setBody: function (body) { return function (dispatchEvent, getState) {
        dispatchEvent({ type: 'SET_BODY', body: body });
    }; }
};
var initialState = {
    sender: '',
    recipients: '',
    subject: '',
    body: '',
    isSending: false,
    isMessageValid: false,
    response: '',
    responseType: ResponseType.OK
};
exports.reducer = function (state, incomingAction) {
    if (state === void 0) { state = initialState; }
    var action = incomingAction;
    switch (action.type) {
        case 'SEND_EMAIL_MESSAGE':
            return __assign({}, state);
        case 'SET_SENDER':
            return __assign({}, state, { sender: action.sender });
        case 'SET_RECIPIENTS':
            return __assign({}, state, { recipients: action.recipients });
        case 'SET_SUBJECT':
            return __assign({}, state, { subject: action.subject });
        case 'SET_BODY':
            return __assign({}, state, { body: action.body });
        case 'SET_IS_SENDING':
            return __assign({}, state, { isSending: action.value });
        case 'SET_RESPONSE':
            return __assign({}, state, { response: action.value });
        case 'SET_RESPONSE_TYPE':
            return __assign({}, state, { responseType: action.value });
        default:
            return state;
    }
};
//# sourceMappingURL=EmailSender.js.map