import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface EmailSenderState {
    sender: string;
    recipients: string;
    subject: string;
    body: string;
    isMessageValid: boolean;
    responseType: ResponseType;
    response: string;
}

enum ResponseType {
    OK,
    Error
}

interface EmailMessage {
    sender: string;
    recipients: Array<string>;
    subject: string;
    body: string;
}

interface SendEmailMessageAction {
    type: 'SEND_EMAIL_MESSAGE'
}

interface SetSenderAction {
    type: 'SET_SENDER',
    sender: string
}

interface SetRecipientsAction {
    type: 'SET_RECIPIENTS',
    recipients: string
}

interface SetSubjectAction {
    type: 'SET_SUBJECT',
    subject: string
}

interface SetBodyAction {
    type: 'SET_BODY',
    body: string
}

type KnownAction = SendEmailMessageAction | SetSenderAction | SetRecipientsAction | SetSubjectAction | SetBodyAction;

export const actionCreators = {
    sendEmailMessage: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.emailSender /*&& appState.emailSender.isMessageValid*/) {
            var request: Request = new Request('api/message', {
                method: 'POST', body: JSON.stringify({
                    sender: { email: appState.emailSender.sender, name: '' },
                    recipients: [{ email: appState.emailSender.recipients, name: '' }],
                    subject: appState.emailSender.subject,
                    body: appState.emailSender.body
                })
            });

            request.headers.set('Content-Type', 'application/json');

            fetch(request)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });

            dispatch({ type: 'SEND_EMAIL_MESSAGE' });
        }
    },
    setSender: (sender: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_SENDER', sender });
    },
    setRecipients: (recipients: string): AppThunkAction<KnownAction> => (dispatchEvent, getState) => {
        dispatchEvent({ type: 'SET_RECIPIENTS', recipients });
    },
    setSubject: (subject: string): AppThunkAction<KnownAction> => (dispatchEvent, getState) => {
        dispatchEvent({ type: 'SET_SUBJECT', subject });
    },
    setBody: (body: string): AppThunkAction<KnownAction> => (dispatchEvent, getState) => {
        dispatchEvent({ type: 'SET_BODY', body });
    }
};

const initialState = {
    sender: '',
    recipients: '',
    subject: '',
    body: '',
    isMessageValid: false,
    response: '',
    responseType: ResponseType.OK
};

export const reducer: Reducer<EmailSenderState> = (state: EmailSenderState | undefined = initialState, incomingAction: Action): EmailSenderState => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SEND_EMAIL_MESSAGE':
            return { ...state };
        case 'SET_SENDER':
            return { ...state, sender: action.sender };
        case 'SET_RECIPIENTS':
            return { ...state, recipients: action.recipients };
        case 'SET_SUBJECT':
            return { ...state, subject: action.subject };
        case 'SET_BODY':
            return { ...state, body: action.body };
        default:
            return state;
    }
};