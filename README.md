# NewCo (Sample project using AWS Amplify/Ionic/Angular) 

This project is a sample for using AWS Amplify to build and host an Ionic + Angular frontend with 
- Amazon DynamoDB: For backend database
- API Gateway: For read/write on database via Lambda proxy
- AWS Lambda: Proxy for API Gateway to read/write on database
- Amazon S3: For storing project assets
- Amazon CloudFront: For serving static web app
- Amazon Cognito: For handling userpools and auth
- AWS Amplify: For tying and managing all of the above together
- AWS CloudFormation: Provider for AWS Amplify to deploy and manage backend resources

Sample acts as a User trying to getting an insurance quote on entering some information like DOB, smoker/non-smoker, duration of policy, biological gender and returns a (randomly generated) quote back to the user. It also stored the quotes in the database and user may then get their own quote history (currently hard-coded to get 6 most-recent ones)

Tested only with
- node v14.1.0
- npm 6.14.4
- aws-amplify: ^3.3.19
- @ionic/angular: ^5.5.2
- @angular/core: ~11.2.0

Disclaimer: Not a frontend developer, was just able to build this from referring the respective ionic and amplify docs, plus some DDG fu.

## Pre-requisites 
- Have [node](https://nodejs.dev/learn/how-to-install-nodejs), [npm](https://www.npmjs.com/get-npm) installed

- Install the amplify-cli ( Installs globally below )

```bash
npm install -g @aws-amplify/cli
```

- You might also need to install ionic and angular

```bash
npm install -g @ionic/cli
npm install -g @angular/cli
```

## Project setup

- Clone this repo

```bash
git clone https://github.com/amdhing/ionic-capstone-amplify.git
```

- Install dependencies and initialize amplify

```bash
cd ionic-capstone-amplify
npm install
amplify init
```
- Prompt might look something like this
```bash
? Do you want to use an existing environment? <No>
? Enter a name for the environment <sampledev>
? Choose your default editor: <Visual Studio Code>
? Select the authentication method you want to use: <AWS profile> (Or keys as you prefer)
? Please choose the profile you want to use <default> (profile setup in ~.aws/config)
Adding backend environment sampledev to AWS Amplify Console app: <abcdef123>
⠧ Initializing project in the cloud...
...
...
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!
```

- Verify amplify setup

```bash
$ amplify status
Current Environment: <sampledev>

| Category | Resource name                | Operation | Provider plugin   |
| -------- | ---------------------------- | --------- | ----------------- |
| Auth     | ioniccapstoneamplifycff544c3 | Create    | awscloudformation |
| Storage  | newcodb                      | Create    | awscloudformation |
| Function | writerlambda                 | Create    | awscloudformation |
| Api      | writerresource               | Create    | awscloudformation |
```
- Setup hosting (default = none)

```bash
amplify add hosting
```
```bash
? Select the plugin module to execute Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Manual deployment

You can now publish your app using the following command:

Command: amplify publish
```

- Create cloud resources

`amplify publish` deploys the frontend as well as backend

`amplify push` deploys the backend only 

```bash
amplify publish
```

```bash
✔ Successfully pulled backend environment <sampledev> from the cloud.

Current Environment: <sampledev>

| Category | Resource name                | Operation | Provider plugin   |
| -------- | ---------------------------- | --------- | ----------------- |
| Auth     | ioniccapstoneamplifycff544c3 | Create    | awscloudformation |
| Storage  | newcodb                      | Create    | awscloudformation |
| Function | writerlambda                 | Create    | awscloudformation |
| Api      | writerresource               | Create    | awscloudformation |
| Hosting  | amplifyhosting               | Create    | awscloudformation |

? Are you sure you want to continue? (Y/n) <Yes>
⠹ Updating resources in the cloud. This may take a few minutes...
...
...
✔ All resources are updated in the cloud

REST API endpoint: https://<randomapiuuid>.execute-api.eu-west-1.amazonaws.com/<sampledev>
```
If hosting using manual deployment (non git-based) the prompt should end with:
```bash
✔ Zipping artifacts completed.
✔ Deployment complete!
https://<sampledev>.<abcdefgh>.amplifyapp.com
```

- (Optional) Launch your frontend locally
This might also ask to install @angular/cli in the project, go ahead with installing it.

```bash
$ ionic serve
...
...
[INFO] Development server running!

       Local: http://localhost:8100

       Use Ctrl+C to quit this process

[INFO] Browser window opened to http://localhost:8100!
...
...
[ng] ✔ Compiled successfully.
```

This should open up `http://localhost:8100` on the browser
    ![Landing View](/docs/img/ionic-serve-browser-page.png)

## Hosting frontend using AWS Amplify

Adding hosting in the most simplest way is using Manual Deployment, which builds, packages and deploys the frontend using Amplify.

Other options include connecting Amplify app to a github repository, where any changes made to the repo automatically get deployed to the app. Here's a bit more on achieving the same.

- Create a github repo (or another options on the AWS Amplify console)
- Go to the AWS Amplify console and connect the app with your github repo

![AWS Amplify](/docs/img/aws-amplify-setup-frontend.png)

Once the setup is complete, AWS Amplify would build and deploy the frontend env and a URL like `https://<branch>.<randomamplifyuuid>.amplifyapp.com/` (`https://master.d3nnmyupeos3jk.amplifyapp.com/`) would be available on the console to go visit your AWS Amplify hosted modern web app!