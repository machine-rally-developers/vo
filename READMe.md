# About (Still in development)

Virtual Orchestration is the virtual agent that caters for your business or personal use-case. Use case such as reduction in customer service phone calls, automation, etc. The virtual orchestration can also be further improved by creating or installing modules from the module market.

# Run in developer module

- Go to the root server folder
- Create a .env file with the following attribute
  `APP_PORT, APP_ENV, DATABASE, DATABASE_ADDRESS, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD,`
- Open the terminal in this folder
- run `node app.js`
- Go to the root client folder
- Open the terminal in this folder
- run `npm start`

# Module developers

## Language required

- javascript

## Creating a module

Creating a module is simple (at this moment in time). Anyone with javascript knowledge is able to create a module
A module requires a:

- `appconfig.json` file
- start file i.e `index.js`

The `appconfig.json` must include the following fields:

<table>

  <tr><td><strong>Field key</strong></td><td><strong>Required</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td></tr>
  <tr><td>author</td>><td>true</td><td>Array</td><td>Author(s) of module</td></tr>
  <tr><td>startFile</td><td>true</td><td>String</td><td>Starting point of module</td></tr>
  <tr><td>description</td><td>true</td><td>String</td><td>Description of module</td></tr>
  <tr><td>licence</td><td>true</td><td>String</td><td>Developer licence</td></tr>
  <tr><td>email</td><td>true</td><td>String</td><td>Developer email</td></tr>
  <tr><td>summary</td><td>true</td><td>String</td><td>Summary of module. Possibly some part of your description</td></tr>
  <tr><td>name</td><td>true</td><td>String</td><td>Name of module</td></tr>
  <tr><td>tags</td><td>false</td><td>Array</td><td>Identifies module's features and purpose</td></tr>
  <tr><td>triggers</td><td>true</td><td>Array (Maybe changed)</td><td>Trigger are word/pattern that `triggers` each module</td></tr>
  <tr><td>packageName</td><td>true</td><td>String</td><td>Unique package name for variables</td></tr>
  <tr><td>variables</td><td>false</td><td>Array of Objects</td><td>Backend can add variable required for each module. Each module will have its own variable</td></tr>
</table>

# Example of a `appconfig.json` file

`{ "authors":["John Doe"], "startFile":"index.js", "description":"String", "licence":"String", "email":"String", "summary":"String", "name":"String", "packageName":"String", "tags":["booking"], "triggers":["create a booking"], "variables":[{"key":"Hello","value":"World"}] }`

# Contact

- machine-rally-developers@gmail.com
