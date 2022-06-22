import { Box, Button, Container, Typography } from '@mui/material';
import { Iconify, LoadingScreen, Page } from 'src/components';
import { useEffect, useState, useCallback } from 'react';
import ProductCard from 'src/components/product/ProductCard';
import { fetchProductsOfDate, IProduct } from 'src/services';
import NoProductsFoundIllustration from 'src/assets/illustration_no_products_found';

export default function Feed() {
  const [productList, setProductList] = useState<IProduct[] | undefined>();
  const [date, setDate] = useState(new Date());
  const isDateToday = date.toDateString() === new Date().toDateString();

  if (productList) {
    productList.sort((a,b) => b.upvotes - a.upvotes);
  }

  const handleFetchFeed = useCallback(async () => {
    const formattedToday = date.toISOString().split('T')[0];
    const products = await fetchProductsOfDate(formattedToday);
    if (products) {
      setProductList(products);
    }
  }, [date]);

  const handleToggleDates = useCallback(
    (days: number) => {
      const newDate = date.setDate(date.getDate() + days);
      setDate(new Date(newDate));
    },
    [date]
    );

    useEffect(() => {
      handleFetchFeed();
    }, [date, handleFetchFeed]);

  if (productList) {
    return (
      <Page title="Product: Profile">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: `${isDateToday ? 'flex-end' : 'space-between'}`, mb: 5 }}>
            {!isDateToday && (
              <Button
                startIcon={<Iconify icon="eva:arrow-back-fill" />}
                onClick={() => handleToggleDates(1)}
                variant="outlined"
              >
                Next day
              </Button>
            )}
            <Button
              endIcon={<Iconify icon="eva:arrow-forward-fill" />}
              onClick={() => handleToggleDates(-1)}
              variant="outlined"
            >
              Previous day
            </Button>
          </Box>
          <Typography variant="h3">{date.toDateString()}</Typography>
          {productList.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                mt: 5,
                gap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
              }}
            >
              {productList?.map((product) => (
                <ProductCard key={product.alias} product={product} />
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
              <NoProductsFoundIllustration />
              <Typography sx={{ textAlign: 'center', mb: 2 }} variant="h3">
                No products found!
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Sorry, no products where posted on this day.{<br />}Check the previous days to
                discover more web3 products!
              </Typography>
            </Box>
          )}
        </Container>
      </Page>
    );
  }

  return <LoadingScreen />;
}
