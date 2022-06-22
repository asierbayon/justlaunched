// @mui
import { Button, Link } from '@mui/material';

import { useParams } from 'react-router';
import useAuth from 'src/hooks/useAuth';
// components
import { Iconify } from '../../components';

// ----------------------------------------------------------------------

export const UserButtons: React.FC = () => {
  const { currentUser } = useAuth();
  const { address } = useParams();

  const isUserOwner = currentUser
    ? currentUser.address.toLowerCase() === address?.toLowerCase()
    : false;

  if (isUserOwner) {
    return (
      <Button
        sx={{ p: 2 }}
        component={Link}
        href={`/user/${currentUser.address}/edit`}
        variant="outlined"
        color="inherit"
        startIcon={<Iconify icon="eva:edit-outline" />}
      >
        Edit profile
      </Button>
    );
  }
  return null;
};
