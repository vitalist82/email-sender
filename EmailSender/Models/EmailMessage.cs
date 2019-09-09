using System.Collections.Generic;

namespace EmailSender.Model
{
    public class EmailMessage
    {
        public EmailAddress Sender { get; set; }
        public IEnumerable<EmailAddress> Recipients { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}