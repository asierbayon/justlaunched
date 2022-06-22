// @mui
import { Container } from '@mui/material';
// components
import { Page, HeaderBreadcrumbs } from '../components';
import { CreateProduct } from 'src/sections/product/CreateProduct';
// ----------------------------------------------------------------------

export default function ProductCreation() {
  return (
    <Page title="Product: Product Settings">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="List product"
          links={[{ name: 'Product', href: `/` }, { name: 'Listing' }]}
        />
        <CreateProduct />
      </Container>
    </Page>
  );
}
