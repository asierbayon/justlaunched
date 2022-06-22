// @mui
import { Grid, Stack } from '@mui/material';
//
import { UserButtons } from './UserButtons';
import { ProfileAbout } from '../common/ProfileAbout';
import { ProfileSocialInfo } from '../common/ProfileSocialInfo';

// ----------------------------------------------------------------------

type Social = {
  twitter?: string;
  discord?: string;
  telegram?: string;
}

interface IUserProfileProps {
  description?: string;
  website?: string;
  socials: Social;
}

export const UserProfile: React.FC<IUserProfileProps> = ({ description, website, socials }) => {
  const hasSocials = socials.twitter || website;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <UserButtons />
          {hasSocials && <ProfileSocialInfo socials={socials} website={website} />}
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {description && <ProfileAbout description={description} />}
        </Stack>
      </Grid>
    </Grid>
  )
};
