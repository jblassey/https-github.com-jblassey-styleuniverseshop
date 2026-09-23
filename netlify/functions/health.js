/**
 * Placeholder Netlify Function establishing the serverless foundation.
 * Later stages (Paystack payment intents, order creation, etc.) will
 * add real functions alongside this one. Deployed at /.netlify/functions/health.
 */
export async function handler() {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'ok', service: 'style-universe' }),
  };
}
