import { useState } from 'react';
// @mui
import { Theme } from '@mui/system';
import { Button, SxProps } from '@mui/material';
// services
import { upvotesService } from 'src/services/upvotes-service';
//
import { Iconify } from '.';
import useAuth from 'src/hooks/useAuth';

interface IUpvoteButtonProps {
  showText?: boolean;
  upvotesFromApi: number;
  upvotedByUser: boolean;
  alias: string;
  sx?: SxProps<Theme>;
}

export const UpvoteButton: React.FC<IUpvoteButtonProps> = ({
  showText,
  upvotedByUser,
  upvotesFromApi,
  alias,
  sx,
}) => {
  const [upvotes, setUpvotes] = useState(upvotesFromApi);
  const [upvoted, setUpvoted] = useState(upvotedByUser);
  const { isAuthenticated } = useAuth();

  const handleUpvote = () => {
    if (alias && isAuthenticated) {
      if (!upvoted) {
        setUpvotes(upvotes! + 1);
        setUpvoted(true);
        upvotesService.upvoteProduct(alias);
      }
      if (upvoted) {
        setUpvotes(upvotes! - 1);
        setUpvoted(false);
        upvotesService.downvoteProduct(alias);
      }
    }
  };

  return (
    <Button
      onClick={handleUpvote}
      sx={{ ...sx }}
      variant={upvoted ? 'outlined' : 'contained'}
      startIcon={<Iconify icon={`ant-design:like-${upvoted ? 'filled' : 'outlined'}`} />}
    >
      {showText && (upvoted ? 'Downvote ' : 'Upvote ')}
      {upvotes}
    </Button>
  );
};
