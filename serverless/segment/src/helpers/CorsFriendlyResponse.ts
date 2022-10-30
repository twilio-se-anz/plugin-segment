export const CorsFriendlyResponse = () => {
  // Create a custom Twilio Response
  const response = new Twilio.Response();
  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};
