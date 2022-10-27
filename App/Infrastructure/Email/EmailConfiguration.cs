﻿namespace Application.Email;

public class EmailConfiguration
{
    public string FromName { get; set; }
    public string FromMail { get; set; }
    public string SmtpServer { get; set; }
    public int Port { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
}
