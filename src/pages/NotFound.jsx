import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="This page could not be found." noIndex />
      <Container className="py-24 sm:py-30 text-center flex flex-col items-center">
        <span className="text-label mb-4">404</span>
        <h1 className="text-h1 mb-4">Lost in the Universe?</h1>
        <p className="text-body max-w-sm mb-10">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/shop" size="lg">
            Shop Now
          </Button>
          <Button to="/" variant="secondary" size="lg">
            Go Home
          </Button>
        </div>
      </Container>
    </>
  );
}
