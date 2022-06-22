// @mui
import { Grid, Stack } from '@mui/material';
//
import { ProductButtons } from './ProductButtons';
import { ProfileAbout } from '../common/ProfileAbout';
import { ProductCreator } from './ProductCreator';
import { IUserFromProduct } from 'src/services';
import { ProductSocialInfo } from './ProductSocialInfo';

// ----------------------------------------------------------------------

type Social = {
  twitter?: string;
  discord?: string;
  telegram?: string;
};

interface IProductProfileProps {
  description: string;
  website: string;
  socials: Social;
  upvotes: number;
  upvotedByUser: boolean;
  user: IUserFromProduct;
}

export const ProductProfile: React.FC<IProductProfileProps> = ({
  description,
  website,
  socials,
  upvotes,
  upvotedByUser,
  user,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={3}>
      <Stack spacing={3}>
        <ProductButtons
          address={user.address}
          upvotesFromApi={upvotes}
          upvotedByUser={upvotedByUser}
          href={website}
        />
        <ProductSocialInfo socials={socials} />
      </Stack>
    </Grid>

    <Grid item xs={12} md={6}>
      <Stack spacing={3}>
        <ProfileAbout description={description} />
      </Stack>
    </Grid>

    <Grid item xs={12} md={3}>
      <ProductCreator user={user} />
    </Grid>
  </Grid>
);
