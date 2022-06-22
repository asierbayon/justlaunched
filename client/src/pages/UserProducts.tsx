import { m } from 'framer-motion';
import { useLocation, useParams, useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Pagination } from '@mui/material';
// components
import { LoadingScreen, MotionContainer, Page, ProductEditCard, varBounce } from '../components';
import { useState, useCallback, useEffect } from 'react';
import { fetchUserProducts, IProduct } from 'src/services';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function UserProducts() {
  const { address } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const page = Number(query.get('page')) < 1 ? 1 : Number(query.get('page'));
  const [productList, setProductList] = useState<IProduct[] | undefined>();
  const [pages, setPages] = useState<number>(1);

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/user/${address}/products?page=${value}`);
  };

  const handleFetchFeed = useCallback(async () => {
    if (address) {
      const data = await fetchUserProducts(address, page - 1);
      if (data) {
        setProductList(data.products);
        setPages(data.pages);
      }
    }
  }, [page, address]);

  useEffect(() => {
    handleFetchFeed();
  }, [page, handleFetchFeed]);

  const productsSection = (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {productList?.map((product) => (
          <ProductEditCard key={product.alias} product={product} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Pagination
          page={page}
          count={pages}
          variant="outlined"
          color="primary"
          onChange={handlePagination}
        />
      </Box>
    </>
  );

  const emptySection = (
    <RootStyle>
      <Container component={MotionContainer}>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              We couldn't find any products!
            </Typography>
          </m.div>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            We couldn't find any products from this user. You can add a product by clicking the
            button below!
          </Typography>
          <Button to="/list-product" size="large" variant="contained" component={RouterLink}>
            List Product
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );

  if (productList) {
    return (
      <Page title="Product: Profile">
        <Container maxWidth="lg">{productList.length > 0 ? productsSection : emptySection}</Container>
      </Page>
    );
  }

  return <LoadingScreen />;
}
