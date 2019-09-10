import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as EmailSenderStore from '../store/EmailSender';

type EmailSenderProps =
    EmailSenderStore.EmailSenderState &
    typeof EmailSenderStore.actionCreators &
    RouteComponentProps<{}>;

class EmailSender extends React.Component<EmailSenderProps> {
    constructor(props: EmailSenderProps) {
        super(props);
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.props.sendEmailMessage();
        }
    }

    public render() {
        return (
            <form className="needs-validation" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-sm-2 col-form-label">
                        <label htmlFor="senderInput">Sender:</label>
                    </div>
                    <div className="col-12 col-sm-10">
                        <input required id="senderInput" className="form-control" placeholder="name@example.com" type="email" name="sender" value={this.props.sender} onChange={(e: React.FormEvent<HTMLInputElement>) => this.props.setSender((e.target as HTMLInputElement).value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-2 col-form-label">
                        <label htmlFor="recipientsInput">Recipients:</label>
                    </div>
                    <div className="col-12 col-sm-10">
                        <input required id="recipientsInput" className="form-control" type="text" name="recipients" value={this.props.recipients} onChange={(e: React.FormEvent<HTMLInputElement>) => this.props.setRecipients((e.target as HTMLInputElement).value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-2 col-form-label">
                        <label htmlFor="subjectInput">Subject:</label>
                    </div>
                    <div className="col-12 col-sm-10">
                        <input required id="subjectInput" className="form-control" type="text" name="subject" value={this.props.subject} onChange={(e: React.FormEvent<HTMLInputElement>) => this.props.setSubject((e.target as HTMLInputElement).value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-form-label">
                        <label>Message:</label>
                    </div>
                    <div className="col-12">
                        <textarea className="form-control form-control-lg" rows={10} name="body" value={this.props.body} onInput={(e: React.FormEvent<HTMLTextAreaElement>) => this.props.setBody((e.target as HTMLTextAreaElement).value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary mt-2 mb-2" type="submit">
                            {this.props.isSending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            Send
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <textarea className="form-control form-control-lg" value={this.props.response} readOnly={true} rows={10} />
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.emailSender, // Selects which state properties are merged into the component's props
    EmailSenderStore.actionCreators // Selects which action creators are merged into the component's props
)(EmailSender as any);