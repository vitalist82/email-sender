"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var EmailSenderStore = require("../store/EmailSender");
var EmailSender = /** @class */ (function (_super) {
    __extends(EmailSender, _super);
    function EmailSender(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (event) {
            event.preventDefault();
            if (event.currentTarget.checkValidity() === false) {
                event.stopPropagation();
            }
            else {
                _this.props.sendEmailMessage();
            }
        };
        return _this;
    }
    EmailSender.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", { className: "needs-validation", onSubmit: this.handleSubmit },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 col-sm-2 col-form-label" },
                    React.createElement("label", { htmlFor: "senderInput" }, "Sender:")),
                React.createElement("div", { className: "col-12 col-sm-10" },
                    React.createElement("input", { required: true, id: "senderInput", className: "form-control", placeholder: "name@example.com", type: "email", name: "sender", value: this.props.sender, onChange: function (e) { return _this.props.setSender(e.target.value); } }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 col-sm-2 col-form-label" },
                    React.createElement("label", { htmlFor: "recipientsInput" }, "Recipients:")),
                React.createElement("div", { className: "col-12 col-sm-10" },
                    React.createElement("input", { required: true, id: "recipientsInput", className: "form-control", type: "text", name: "recipients", value: this.props.recipients, onChange: function (e) { return _this.props.setRecipients(e.target.value); } }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 col-sm-2 col-form-label" },
                    React.createElement("label", { htmlFor: "subjectInput" }, "Subject:")),
                React.createElement("div", { className: "col-12 col-sm-10" },
                    React.createElement("input", { required: true, id: "subjectInput", className: "form-control", type: "text", name: "subject", value: this.props.subject, onChange: function (e) { return _this.props.setSubject(e.target.value); } }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 col-form-label" },
                    React.createElement("label", null, "Message:")),
                React.createElement("div", { className: "col-12" },
                    React.createElement("textarea", { className: "form-control form-control-lg", rows: 10, name: "body", value: this.props.body, onInput: function (e) { return _this.props.setBody(e.target.value); } }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12" },
                    React.createElement("button", { className: "btn btn-primary mt-2 mb-2", type: "submit" },
                        this.props.isSending && React.createElement("span", { className: "spinner-border spinner-border-sm", role: "status", "aria-hidden": "true" }),
                        "Send"))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12" },
                    React.createElement("textarea", { className: "form-control form-control-lg", value: this.props.response, readOnly: true, rows: 10 })))));
    };
    return EmailSender;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.emailSender; }, // Selects which state properties are merged into the component's props
EmailSenderStore.actionCreators // Selects which action creators are merged into the component's props
)(EmailSender);
//# sourceMappingURL=EmailSender.js.map