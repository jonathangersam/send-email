package main

import (
	"log"
	"net/smtp"
)

var (
	SMTP_SERVER_ADDR = "smtp.ethereal.email"
	SMTP_PORT = "587" // was 25
	SMTP_ACCT = "cvahrcl37miilsua@ethereal.email"	
	SMTP_PSWD = "EkS4ezEhmz15xVAn8t"
	SENDER_ADDR = "cvahrcl37miilsua@ethereal.email"
	RECEIVE_ADDR = "recipient@example.net"
	EMAIL_BODY = "This is the email body. Hello from GOLANG! --- JON"
)

func main() {
	// Set up authentication information.
	auth := smtp.PlainAuth(
		"",
		SMTP_ACCT,
		SMTP_PSWD,
		SMTP_SERVER_ADDR,
	)

	// Connect to the server, authenticate, set the sender and recipient,
	// and send the email all in one step.
	err := smtp.SendMail(
		SMTP_SERVER_ADDR + ":" + SMTP_PORT,
		auth,
		SENDER_ADDR,
		[]string{RECEIVE_ADDR},
		[]byte(EMAIL_BODY),
	)

	if err != nil {
		log.Fatal(err)
	}
}
