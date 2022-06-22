// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
// utils
import cssStyles from '../../utils/cssStyles';
// components
import { Image } from '../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

interface IProductCoverProps {
  title: string;
  subtitle: string;
  avatar: string;
  coverImage?: string;
}

export const ProductCover: React.FC<IProductCoverProps> = ({ title, subtitle, avatar, coverImage }) => (
  <RootStyle>
    <InfoStyle>
      <Avatar
        src={avatar}
        sx={{
          mx: 'auto',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'common.white',
          width: { xs: 80, md: 128 },
          height: { xs: 80, md: 128 },
        }}
      />
      <Box
        sx={{
          ml: { md: 3 },
          mt: { xs: 1, md: 0 },
          color: 'common.white',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Typography sx={{ opacity: 0.72 }}>{subtitle}</Typography>
        </Box>
      </Box>
    </InfoStyle>
    <Image
      alt="profile cover"
      src="/images/default_cover_image.jpeg"
      sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    />
  </RootStyle>
);
