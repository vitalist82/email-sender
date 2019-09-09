using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmailSender.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace EmailSender.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class EmailMessageController : ControllerBase
    {
        private readonly IOptions<MyConfig> config;

        public EmailMessageController(IOptions<MyConfig> config)
        {
            this.config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]EmailMessage message)
        {
            string apiKey = config.Value.ApiKey;
            SendGridClient client = new SendGridClient(apiKey);
            var from = new SendGrid.Helpers.Mail.EmailAddress(message.Sender.Email, message.Sender.Name);
            var subject = message.Subject;
            var tos = message.Recipients.Select(sourceAddr => 
                new SendGrid.Helpers.Mail.EmailAddress(sourceAddr.Email, sourceAddr.Name)).ToList();
            var plainTextContent = message.Body;
            var htmlContent = message.Body;
            SendGridMessage msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return Ok(response);
        }
    }
}