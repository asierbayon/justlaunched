// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Button } from '@mui/material';
// utils
import cssStyles from 'src/utils/cssStyles';
// components
import { Image, SvgIconStyle } from 'src/components/';
import { Iconify } from '../Iconify';
// @types
import { IProduct } from '../../services';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

interface IProductEditCardProps {
  product: IProduct;
}

export default function ProductEditCard({ product }: IProductEditCardProps) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt="avatar"
          src={product.logo}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src="/images/default_cover_image.jpeg" alt="cover" ratio="21/9" />
      </Box>
      <Box sx={{ px: 3 }}>
        <Typography variant="subtitle1" sx={{ mt: 6 }}>
          {product.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {product.tagline}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '20px' }}
        >
          <Button
            startIcon={<Iconify icon="eva:eye-outline" />}
            variant="contained"
            color="inherit"
            href={`/product/${product.alias}`}
          >
            View
          </Button>
          <Button startIcon={<Iconify icon="eva:edit-outline" />} variant="contained" href={`/product/${product.alias}/edit`}>
            Edit
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
