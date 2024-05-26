# Admin-Firstpage

### ***For resolving common issues, please see the below section "Common setup issues and solutions".

If you're having trouble connecting to the backend, refer to the entry for "Issues connecting to the backend: 500" or "Issues connecting to the backend: 404".

This repo uses NPM, follow the below steps to setup the project.

## Getting Started: initial setup.

### Npm

- Install npm: https://www.npmjs.com/get-npm

## Getting Started: Setup Environment

### Clone the repository 

 - When cloning, you will be prompted to enter your password.
 - The password is NOT the password for your GitHub account!
 - You will have to first generate a personal access token (here's how to do it - https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
 - Enter the generated token into the password section

### Setting up and running the project

1. Run `npm install` inside the project root folder (nl1-dashboard-fe, 1 level above the "src" folder) if dependencies changed since last install.
2. Run `npm run serve` to start the application.
3. If you have any errors from the previous steps, please look below at the section "Common setup issues and solutions" and try the solutions listed there.
4. If the frontend is running correctly, you will see a page with login/registration buttons and you can navigate to the login/registration pages.
5. However, you won't be able to see anything else in nl1cloud until you setup the backend and create a user to login to the site. To install the backend, please follow the instructions in the "hub-framework-be" repo's README. If you don't have access to that repo, ask Albin to give you access.
6. Once you register on the registration page, you must retrieve your approval token. Normally, that would be emailed to Albin or someone else and they would give it to the user, but as developers, you can go to the Postgres shell and get your token from the "pending_token" field of your user's entry in the "cre_user_ table. Essentially, execute "SELECT * from cre_user;" and grab the pending/approval token as described above.
7. If you wish to test the Forgot/Reset password functionalities, go through the steps as shown on the frontend, and then grab your reset token by running "SELECT * from user_token WHERE user_id='your id'". Normally, your reset token is emailed to Albin or someone else and then sent to you, but right now the email functionality is not working.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Common setup issues and solutions

### Problem: "Node Sass does not yet support your current environment" or "Unsupported architecture" after running "npm install" or "npm run dev" or "npm start"

This might mean your installed version of Node and Node Sass are in conflict. Check your version of node-sass in package.json (inside the project root), and then check your version of node with the command "node -v". Check if the Node and node-sass versions are compatible according to the table in this link (scroll down in the provided link to view the table): https://github.com/sass/node-sass. If your versions are incompatible, install the latest version of node compatible with the node-sass version in package.json.

If this doesn't work, try the command "npm run rebuild".

### Problem: "x package or dependency not found":

Make sure to run npm install in the project root folder, not outside of it. See the above solution for Node Sass related errors, if your error message includes anything related to node-sass (scan your error message carefully for any keywords/dependencies).

### Problem: "Error: error:0308010C:digital envelope routines::unsupported at new Hash (node:internal/crypto/hash:67:19) at Object.createHash (node:crypto:130:10)"

The solutions listed here should fix this issue: https://stackoverflow.com/questions/69394632/webpack-build-failing-with-err-ossl-evp-unsupported

### Problem: "Issues connecting to the backend: 500"

If you see something like "500 error" in the Chrome/Firefox Developer console, the frontend made a request to the backend that the backend can't handle. Below are some common reasons why.

Each backend API contains an object into which frontend objects are scanned (for a POST request), or database entries are scanned (for GET requests). This object is found in the "properties.go" file for each relevant API, inside the "services" folder of the repo "hub-framework-be". That object has multiple variables whose names/types must exactly match those of the frontend object being sent. Additionally, the name in the Golang object's "db" field mentioned above must exactly match the corresponding name in the corresponding database schema (found in the "migrations" folder of hub-framework-be). Look through your frontend and backend objects very carefully for any mismatch, this is one of the most common reasons for a 500 error.

If you find a mismatch between your db schema and the Golang object, change your Golang object and/or db schema to the corrected version. If you made any changes to the db schema, to register those changes, go to your Postgres shell and execute "DROP TABLE x;" without the quotation marks. You may also have to run "DROP TABLE x CASCADE;" if it says that any tables reference the one you're trying to DROP. Then, copy/paste the CORRECTED code from the db schema file, but before running the code, remove the last line for "DROP TABLE" since that will simply delete the table again.

### Problem: "Issues connecting to the backend: 404"

Ensure that you're running the backend on the same port specified in the frontend repo. In the Chrome/Firefox developer console where you see the 404 error, it will say what port the frontend tried to reach the backend at.
