// @mui
import { Card, Typography, CardHeader, Stack } from '@mui/material';

// ----------------------------------------------------------------------

interface IProfileAboutProps {
  description: string;
}

export const ProfileAbout: React.FC<IProfileAboutProps> = ({ description }) => (
  <Card>
    <CardHeader title="About" />

    <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  </Card>
);
