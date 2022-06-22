import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Container } from '@mui/material';
// components
import { Page, HeaderBreadcrumbs, LoadingScreen } from '../components';
import { ProductCover } from 'src/sections/product/ProductCover';
import { ProductProfile } from 'src/sections/product/ProductProfile';
// queries
import { useProduct } from '../queries';
// ----------------------------------------------------------------------

const SpacerStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('md')]: {
    height: '40px',
  },
}));

// ----------------------------------------------------------------------

export const Product: React.FC = () => {
  const { alias } = useParams();

  const { data: product } = useProduct(alias!);

  if (product) {
    return (
      <Page title="Product: Profile">
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Product"
            links={[{ name: 'Product', href: '/' }, { name: product.name ?? '' }]}
          />
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: 'relative',
            }}
          >
            <ProductCover
              title={product.name}
              subtitle={product.tagline}
              avatar={product.logo}
              coverImage={product.coverImage}
            />
            <SpacerStyle />
          </Card>

          <ProductProfile
            socials={{
              twitter: product.twitter,
              discord: product.discord,
              telegram: product.telegram,
            }}
            website={product.website}
            description={product.description}
            upvotes={product.upvotes}
            upvotedByUser={product.upvoted}
            user={product.user}
          />
        </Container>
      </Page>
    );
  }

  return <LoadingScreen />;
};
