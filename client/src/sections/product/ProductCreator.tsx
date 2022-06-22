import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
// contexts
import { useInjectedProvider } from 'src/contexts/InjectedProviderContext';
// @mui
import { Avatar, Box, Card, CardHeader, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// types
import type { IUserFromProduct } from 'src/services';
// utils
import { shortenAddress } from 'src/utils/address';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

interface IProductCreatorProps {
  user: IUserFromProduct;
}

export const ProductCreator: React.FC<IProductCreatorProps> = ({ user }) => {
  const { provider } = useInjectedProvider();
  
  const [displayName, setDisplayName] = useState(shortenAddress(user.address))

  const handleLookupAddress = useCallback(async () => {
    if (provider) {
      const ens = await provider.lookupAddress(user.address);
      if (ens) {
        setDisplayName(ens);
      }
    }
  }, [provider, user.address]);

  useEffect(() => {
    handleLookupAddress();
  }, [handleLookupAddress]);

  return (
  <Card>
    <CardHeader title="Listed by" />
    <Box p={3}>
      <RouterLink to={`/user/${user.address}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <RootStyle>
          <Avatar src={user.avatar} alt={user.address} />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {displayName}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
              {shortenAddress(user.address)}
            </Typography>
          </Box>
        </RootStyle>
      </RouterLink>
    </Box>
  </Card>
)
          }
