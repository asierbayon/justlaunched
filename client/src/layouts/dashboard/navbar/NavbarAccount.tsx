// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Button, Tooltip, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { useInjectedProvider } from 'src/contexts/InjectedProviderContext';
import { shortenAddress } from 'src/utils/address';
import useAuth from 'src/hooks/useAuth';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Iconify } from 'src/components';

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

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { connectWallet, address, displayName } = useInjectedProvider();
  const { currentUser } = useAuth();

  if (address && currentUser) {
    return (
      <RouterLink to={`/user/${address}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <Avatar
            src={currentUser.avatar}
            alt={address}
          />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {displayName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                {shortenAddress(address)}
              </Typography>
              <CopyToClipboard text={address}>
                <Tooltip title="Copy" sx={{ ml: 1 }}>
                  <IconButton>
                    <Iconify icon={'eva:copy-fill'} width={15} height={15} />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
          </Box>
        </RootStyle>
      </RouterLink>
    );
  }

  return (
    <Button variant="outlined" onClick={connectWallet} sx={{ p: 2 }} color='primary'>
      Connect wallet
    </Button>
  )
}
