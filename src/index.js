import { GET, POST } from './rest';
import sessionFactory from './session';

/**
 * This function creates a new WebDriver session.
 * @param {string} url WebDriver server URL
 * @param {object} options configuration object for creating the session
 * @returns {Promise<Session>} session
 * @see {@link https://www.w3.org/TR/webdriver/#new-session|WebDriver spec}
 * @example
 * import webdriver from 'w3c-webdriver';
 *
 * let session;
 *
 * const start = async () => {
 *   session = await webdriver.newSession('http://localhost:4444', {
 *       desiredCapabilities: {
 *           browserName: 'Chrome'
 *       }
 *   });
 * };
 *
 * start()
 *  .catch(err => console.log(err.stack))
 *  .then(() => session.delete());
 */
export const newSession = (url, options) => POST(`${url}/session`, options).then(body => sessionFactory(
  url,
  // JSON Wire   || W3C Web Driver
  body.sessionId || body.value.sessionId, { JsonWire: !!body.sessionId }
));
/**
 * This function queries the WebDriver server's current status.
 * @param {string} url WebDriver server URL
 * @returns {Promise<Object>} status
 * @see {@link https://www.w3.org/TR/webdriver/#status|WebDriver spec}
 * @example
 * import webdriver from 'w3c-webdriver';
 *
 * const start = async () => {
 *   const status = await webdriver.status('http://localhost:4444');
 *   // status = {
 *   //   build: { version: '1.2.0' },
 *   //   os: { name: 'mac', version: 'unknown', arch: '64bit' }
 *   // }
 * };
 *
 * start().catch(err => console.log(err.stack));
 */
export const status = url => GET(`${url}/status`).then(body => body.value);
