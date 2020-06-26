const Alexa = require("ask-sdk-core");
const actions = require("./functions");

// Launch Request Handler -- When a skill is launched
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    console.log("Launch Request Handler Called");

    let speechText =
      "Hello, I am Scapic's bot. I will help you to manage deployments. Let's get started.";
    let repromptText =
      "I did not receive any input. You can ask me to deploy a repository like apollo or shopify.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  }
};

// Handler for Random Quote
const ApolloDeployment = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ApolloDeployment"
    );
  },
  handle(handlerInput) {
    console.log("Apollo Deploy intent handler called");
    actions();
    const cardTitle = "Deployment"
    const cardContent = "Invoked CodeBuild"
    const speechText = "I have invoke the build process for apollo. Please wait while i deploy apollo for you."
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  }
};


// Unhandled Requests
const UnhandledHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error Handler : ${error.message}`);

    return handlerInput.responseBuilder
      .speak(
        "Sorry, I am unable to understand what you said. You can ask me to deploy a repository"
      )
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, ApolloDeployment)
  .addErrorHandlers(UnhandledHandler)
  .lambda();