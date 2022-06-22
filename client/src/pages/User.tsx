import { useParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Container } from '@mui/material';
// components
import { Page, HeaderBreadcrumbs } from '../components';
import { UserProfile } from 'src/sections/user/UserProfile';
import { UserCover } from 'src/sections/user/UserCover';
// queries
import { useUser } from 'src/queries/user';
import { createAvatarFromAddress, shortenAddress } from 'src/utils/address';
// contexts
import { useInjectedProvider } from 'src/contexts/InjectedProviderContext';

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

export const User: React.FC = () => {
  const { address } = useParams();
  const { data: user } = useUser(address!);
  const { provider } = useInjectedProvider();
  
  const [displayName, setDisplayName] = useState(shortenAddress(address!))

  const handleLookupAddress = useCallback(async () => {
    if (provider && address) {
      const ens = await provider.lookupAddress(address);
      if (ens) {
        setDisplayName(ens);
      }
    }
  }, [provider, address]);

  useEffect(() => {
    handleLookupAddress();
  }, [handleLookupAddress])

  return (
    <Page title={`User: ${shortenAddress(address!)}`}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Profile"
          links={[{ name: 'User' }, { name: displayName ?? '' }]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <UserCover
            title={displayName}
            subtitle={address!}
            avatar={user?.avatar ?? createAvatarFromAddress(address!)}
            coverImage={user?.coverImage}
          />
          <SpacerStyle />
        </Card>

        <UserProfile
          website={user?.website}
          description={user?.about}
          socials={{ twitter: user?.twitter, discord: user?.discord }}
        />
      </Container>
    </Page>
  );
};
