// @mui
import { Stack, Button, Link } from '@mui/material';
import { useParams } from 'react-router';
import { useInjectedProvider } from 'src/contexts/InjectedProviderContext';
// components
import { Iconify, UpvoteButton } from '../../components';

// ----------------------------------------------------------------------

interface IProductButtonsProps {
  address: string;
  href: string;
  upvotesFromApi: number;
  upvotedByUser: boolean;
}

export const ProductButtons: React.FC<IProductButtonsProps> = ({
  address,
  href,
  upvotesFromApi,
  upvotedByUser,
}) => {
  const { alias } = useParams();
  const { address: currentUserAddress } = useInjectedProvider();

  const isProductOwner = address === currentUserAddress ? true : false;

  return (
    <Stack spacing={1}>
      {isProductOwner && (
        <Button
          sx={{ p: 2 }}
          component={Link}
          href={`/product/${alias}/edit`}
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon="eva:edit-outline" />}
        >
          Edit product
        </Button>
      )}

      <UpvoteButton
        showText={true}
        upvotesFromApi={upvotesFromApi}
        upvotedByUser={upvotedByUser}
        alias={alias!}
        sx={{ p: 2 }}
      />

      {href && (
        <Button
          sx={{ p: 2 }}
          component={Link}
          href={href}
          target="_blank"
          variant="outlined"
          startIcon={<Iconify icon="eva:external-link-outline" />}
        >
          Get it
        </Button>
      )}
    </Stack>
  );
};
