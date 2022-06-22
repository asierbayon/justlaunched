// @mui
import { Box, Card, Avatar, Divider, Typography, Button, ButtonBase } from '@mui/material';
// components
import { Iconify } from '../Iconify';
// @types
import { IProduct } from '../../services';
import { UpvoteButton } from '..';

// ----------------------------------------------------------------------

interface IProductFeedCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProductFeedCardProps) {
  const href = `/product/${product.alias}`;

  return (
    <Card sx={{ textAlign: 'center', width: '100%' }}>
      <ButtonBase href={href}>
        <Avatar
          alt="avatar"
          src={product.logo}
          sx={{
            width: 64,
            height: 64,
            left: 0,
            right: 0,
            mt: 3,
            mx: 'auto',
          }}
        />
      </ButtonBase>
      <Box sx={{ px: 3 }}>
        <ButtonBase href={href} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1">{product.name}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            {product.tagline}
          </Typography>
        </ButtonBase>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          sx={{
            py: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: '20px',
          }}
        >
          <Button
            startIcon={<Iconify icon="eva:external-link-outline" />}
            variant="contained"
            color="inherit"
            href={product.website}
          >
            Website
          </Button>
          <UpvoteButton
            upvotesFromApi={product.upvotes}
            upvotedByUser={product.upvoted}
            alias={product.alias}
          />
        </Box>
      </Box>
    </Card>
  );
}
