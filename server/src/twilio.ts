import * as CONFIG from './config';
import { AccessTokenOptions } from 'twilio/lib/jwt/AccessToken'
const AccessToken = require('twilio').jwt.AccessToken;

const OPTIONS: AccessTokenOptions = {
  ttl: 120,
}

export function getToken(identity: string) {
  const ChatGrant = AccessToken.ChatGrant;
  const chatGrant = new ChatGrant({ serviceSid: CONFIG.serviceSid });

  const token = new AccessToken(
    CONFIG.twilioAccountSid,
    CONFIG.twilioApiKey,
    CONFIG.twilioApiSecret,
    OPTIONS,
  );

  token.addGrant(chatGrant);
  token.identity = identity;
  return token.toJwt();
}