import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, Button, Tooltip, IconButton } from '@mui/material';
// components
import { IconButtonAnimate, Iconify, MenuPopover } from '../../../components';
// utils
import { shortenAddress } from 'src/utils/address';
// services
import { usersService } from 'src/services';
// contexts
import { useInjectedProvider } from 'src/contexts/InjectedProviderContext';
// hooks
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const { connectWallet, address, displayName, disconnectWallet } = useInjectedProvider();
  const { currentUser, onUserChange } = useAuth();

  const MENU_OPTIONS = [
    {
      label: 'Home',
      linkTo: '/home',
    },
    {
      label: 'Profile',
      linkTo: `/user/${address}`,
    },
    {
      label: 'Settings',
      linkTo: `/user/${address}/edit`,
    },
  ];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleConnectWallet = useCallback(async () => {
    if (address && !currentUser) {
      const user = await usersService.login({ address });
      onUserChange(user);
    }
  }, [address, currentUser, onUserChange])

  const handleDisconnectWallet = () => {
      disconnectWallet();
      onUserChange(undefined);
  }

  useEffect(() => {
    handleConnectWallet();
  }, [handleConnectWallet])

  if (address && currentUser) {
    return (
      <>
        <IconButtonAnimate
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <Avatar
            src={currentUser.avatar}
            alt={address}
          />
        </IconButtonAnimate>

        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          sx={{
            p: 0,
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {displayName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }} noWrap>
                {shortenAddress(address)}
              </Typography>
              <CopyToClipboard text={address}>
                <Tooltip title="Copy">
                  <IconButton>
                    <Iconify icon={'eva:copy-fill'} width={15} height={15} />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={handleClose} component={RouterLink} to={option.linkTo}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleDisconnectWallet} sx={{ m: 1 }}>Logout</MenuItem>
        </MenuPopover>
      </>
    );
  }

  return (
    <Button variant='contained' onClick={connectWallet}>Connect wallet</Button>
  )
}
