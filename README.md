In order for this repo to connect you must first create two environment variable files.

These are as follows:
.env.test
.env.development

This can be done either by using "touch <filename>" or "cat > <filename>".

Inside each file the connection is established by entering PGDATABASE=<reference>.

The reference for .env.test should be "nc-games-test".
The reference for .env.development should be "nc-games".

You will also need to run "npm install", "npm install express", and "npm install supertest" within the root directory.

Enjoy :)
