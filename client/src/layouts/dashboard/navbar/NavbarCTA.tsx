// @mui
import { Stack, Button, Typography } from '@mui/material';
// assets
import NavbarCTAIllustration from 'src/assets/illustration_navbarCTA';

// ----------------------------------------------------------------------

export default function NavbarCTA() {
  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <NavbarCTAIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          List your product
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Showcase your product on JustLaunched!
        </Typography>
      </div>

      <Button href="/list-product" variant="contained">List product</Button>
    </Stack>
  );
}
