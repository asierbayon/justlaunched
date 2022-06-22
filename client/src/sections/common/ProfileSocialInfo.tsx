// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, CardHeader, Stack, useTheme } from '@mui/material'; // @types
// components
import { Iconify } from '../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

interface IProfileSocialInfo {
  socials: {
    twitter?: string;
    discord?: string;
    telegram?: string;
  },
  website?: string;
}

export const ProfileSocialInfo: React.FC<IProfileSocialInfo> = ({ socials, website }) => {

  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;

  const SOCIALS = [
    {
      name: 'Website',
      icon: <IconStyle icon={'mdi:web'} color={PRIMARY_MAIN} />,
      href: website,
    },
    {
      name: 'Twitter',
      icon: <IconStyle icon={'fa-brands:twitter'} color="#1C9CEA" />,
      href: socials.twitter,
    },
    {
      name: 'Discord',
      icon: <IconStyle icon={'fa-brands:discord'} color="#5865F2" />,
      href: socials.discord,
    },
    {
      name: 'Telegram',
      icon: <IconStyle icon={'fa-brands:telegram-plane'} color="#0088CC" />,
      href: socials.telegram,
    },
  ];

  const filteredSocials = SOCIALS.filter(social => social.href && social.href.length > 0 !== undefined);

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {filteredSocials.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link variant="body2" color="text.primary" noWrap href={link.href} >
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
