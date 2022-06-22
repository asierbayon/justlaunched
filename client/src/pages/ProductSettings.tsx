import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// components
import { Page, Iconify, HeaderBreadcrumbs, LoadingScreen } from '../components';
import { EditProduct } from '../sections/product'
import { useProduct } from 'src/queries';
import { useParams } from 'react-router';
import { ProductAccount } from 'src/sections/product/ProductAccount';
// ----------------------------------------------------------------------

export default function ProductSettings() {

  const [currentTab, setCurrentTab] = useState('profile');

  const { alias } = useParams();
  const { data: product } = useProduct(alias!);


  if (product) {

    const ACCOUNT_TABS = [
      {
        value: 'profile',
        icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
        component: <EditProduct product={product} />,
      },
      {
        value: 'settings',
        icon: <Iconify icon={'ic:baseline-settings-applications'} width={20} height={20} />,
        component: <ProductAccount />,
      },
    ];

    return (
      <Page title="Product: Product Settings">
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Product"
            links={[
              { name: product.name, href: `/product/${product?.alias}` },
              { name: 'Product Settings' },
            ]}
          />

          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      </Page>
    );
  }
  return <LoadingScreen />
}
