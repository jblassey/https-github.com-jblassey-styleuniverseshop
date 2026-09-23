import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';

export default function Account() {
  return (
    <>
      <SEO title="Account" description="Sign in to your Style Universe account." noIndex />
      <Container className="py-12 sm:py-16">
        <SectionHeading label="Account" title="Your Account" level="h1" />
        <EmptyState
          className="mt-8 border border-grey-100"
          title="Sign-in Coming Soon"
          description="Accounts and order history aren't connected yet — guest checkout works today."
          action={
            <Button to="/shop" variant="secondary">
              Continue Shopping
            </Button>
          }
        />
      </Container>
    </>
  );
}
