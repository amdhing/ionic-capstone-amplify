# Using artillery for non-auth testing

## Setup
Deploying this demo with `amplify publish` or `amplify push` will deploy API Gateway stages that communicate with the Lambda for PUT/GET on the DB Storage

This APIGW stage however is going to expect AWSSig4 Auth headers. For simply demo purposes, if using [artillery](https://artillery.io/) to demonstrate tests, below are some stock scenarios which only require the APIGW stage without AWS IAM Auth.

Steps to deploy a stage without AWS IAM
- Go to APIGW console, select the stage created by this project
- Disable AWS IAM Auth on both the main `/writer` and the `{proxy}`
- Deploy a new stage and get that endpoint to set as `target` in the artillery scenario configs 

## Scenarios
### artillery-test/artillery-demo-puts.yml

Simple PUTs with following payload (some attributes are added by the Lambda itself)
```bash
{
    "pk": "foo@amazon.com",
    "quote": 100,
    "age": 57,
    "gender": "Male",
    "smoker": "No",
    "test": "yes"
}
```

### artillery-test/artillery-demo-query.yml

Only GETs for `{"pk" : "foo@amazon.com"}`

### artillery-test/artillery-demo-mix.yml

Combination of PUTs and GETs from both above scenarios with exactly same payloads