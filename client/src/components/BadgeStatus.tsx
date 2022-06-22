// @mui
import { Theme, useTheme, styled } from '@mui/material/styles';
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type BadgeStatusEnum =
  | 'away'
  | 'busy'
  | 'unread'
  | 'online'
  | 'offline'
  | 'invisible'
  | string;

type BadgeSize = 'small' | 'medium' | 'large';

const RootStyle = styled('span')(
  ({
    theme,
    ownerState,
  }: {
    theme: Theme;
    ownerState: {
      size: BadgeSize;
    };
  }) => {
    const { size } = ownerState;

    return {
      width: 10,
      height: 10,
      display: 'flex',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      '&:before, &:after': {
        content: "''",
        borderRadius: 1,
        backgroundColor: theme.palette.common.white,
      },

      ...(size === 'small' && { width: 8, height: 8 }),

      ...(size === 'large' && { width: 12, height: 12 }),
    }
  });

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  size?: BadgeSize;
  status?: BadgeStatusEnum;
}

export const BadgeStatus = ({ size = 'medium', sx }: Props) => {
  const theme = useTheme();

  return <RootStyle ownerState={{ size }} sx={sx} theme={theme} />;
}
