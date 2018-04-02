# send-email
A simple email-sending service written in Node JS.

Launches an http server at port 8080

# notes
Relies on a GMail acct for backend.

Need to provide your own GMail acct email and password.

you may optionally build this as a docker image (Dockerfile is provided)

## usage
1. set environment var "EMAIL_USER" to your gmail address
2. set environment var "EMAIL_PASSWORD" to your gmail password
3. run "node server.js"
4. via browser, go to localhost:8080 to see instructions
5. sample to send something localhost:8080/send?phone=+6312345678&msg=hello_world

