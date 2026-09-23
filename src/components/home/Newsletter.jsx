import { useState } from 'react';
import Container from '../ui/Container.jsx';
import { newsletter } from '../../data/homepage.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup with basic client-side validation and a success
 * state. Not connected to an email marketing provider yet — that wiring
 * happens in a later stage; this stage only needs the form to behave
 * like a real one (validate, show errors, confirm success).
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus('error');
      setErrorMsg('Enter your email address.');
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      setErrorMsg('Enter a valid email address.');
      return;
    }

    setStatus('success');
    setErrorMsg('');
  };

  return (
    <section className="bg-black text-white py-20 sm:py-24">
      <Container className="max-w-xl text-center flex flex-col items-center">
        <h2 className="text-h1 text-white">{newsletter.headline}</h2>
        <p className="text-body text-grey-300 mt-4">{newsletter.copy}</p>

        {status === 'success' ? (
          <p className="text-body text-white mt-8 border border-charcoal-light px-6 py-4 w-full" role="status">
            You&rsquo;re in. Welcome to the Universe &mdash; watch your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="w-full mt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Your email address"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className="flex-1 bg-transparent border border-grey-500 px-5 py-4 text-sm text-white placeholder:text-grey-400 focus-visible:outline-white"
              />
              <button
                type="submit"
                className="text-button px-9 py-4 bg-white text-black hover:bg-grey-100 transition-colors whitespace-nowrap"
              >
                {newsletter.ctaLabel}
              </button>
            </div>
            {status === 'error' && (
              <p id="newsletter-error" className="text-body-sm text-left mt-2 text-grey-100">
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </Container>
    </section>
  );
}
