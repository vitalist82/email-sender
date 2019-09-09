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

    handleSubmit = () => {
        this.props.sendEmailMessage();
    }

    public render() {
        return (
            <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); this.props.sendEmailMessage(); }}>
                <div className="row">
                    <div className="col-12 col-sm-2 col-form-label">
                        <label>Sender:</label>
                    </div>
                    <div className="col-12 col-sm-10">
                        <input id="senderInput" className="form-control" placeholder="name@example.com" type="email" name="sender" value={this.props.sender} onChange={(e: React.FormEvent<HTMLInputElement>) => this.props.setSender((e.target as HTMLInputElement).value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-2 col-form-label">
                        <label>Recipients:</label>
                    </div>
                    <div className="col-12 col-sm-10">
                        <input className="form-control" type="text" name="recipients" value={this.props.recipients} onChange={(e: React.FormEvent<HTMLInputElement>) => this.props.setRecipients((e.target as HTMLInputElement).value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-2 col-form-label">
                        <label>Subject:</label>
                    </div>
                    <div className="col-12 col-sm-10">
                        <input className="form-control" type="text" name="subject" value={this.props.subject} onChange={(e: React.FormEvent<HTMLInputElement>) => this.props.setSubject((e.target as HTMLInputElement).value)} />
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
                <input type="submit" name="submit" className="btn btn-primary mt-2" />
            </form>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.emailSender, // Selects which state properties are merged into the component's props
    EmailSenderStore.actionCreators // Selects which action creators are merged into the component's props
)(EmailSender as any);