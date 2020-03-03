# About

Virtual Orchestration is the virtual agent that caters for your business or personal use-case. Use case such as reduction in customer service phone calls, automation, etc. The virtual orchestration can also be further improved by creating or installing modules from the module market.

# Run in developer module

npm run start-dev

# Run in production mode

npm start

# Plugin developers

## Language required

- javascript

## Creating a module

Creating a module is simple (at this moment in time). Anyone with javascript knowledge is able to create a module
A module requires a:

- `appconfig.json` file
- start file i.e `index.js`

The `appconfig.json` must include the following fields:

<table>
  <th>
    <tr><td>Field key</td><td>Required</td><td>Type</td></tr>
  </th>
  <tr><td>author</td>><td>true</td><td>Array</td></tr>
  <tr><td>startFile</td><td>true</td><td>String</td></tr>
  <tr><td>description</td><td>true</td><td>String</td></tr>
  <tr><td>licence</td><td>true</td><td>String</td></tr>
  <tr><td>email</td><td>true</td><td>String</td></tr>
  <tr><td>summary</td><td>true</td><td>String</td></tr>
  <tr><td>name</td><td>true</td><td>String</td></tr>
  <tr><td>packageName</td><td>true</td><td>String</td></tr>
  <tr><td>tags</td><td>false</td><td>Array</td></tr>
  <tr><td>triggers</td><td>true</td><td>Array</td></tr>
  <tr><td>packageName</td><td>true</td><td>String</td></tr>
  <tr><td>variables</td><td>false</td><td>Array of Objects</td></tr>
</table>

# Example of a `appconfig.json` file

{
"authors":["John Doe"],
"startFile":"index.js",
"description":"String",
"licence":"String",
"email":"String",
"summary":"String",
"name":"String",
"packageName":"String",
"tags":["booking"],
"triggers":["create a booking"],
"variables":[{"key":"Hello","value":"World"}]
}
