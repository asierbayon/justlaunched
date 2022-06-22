import * as Yup from 'yup';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fData } from '../../utils/formatNumber';
// components
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
} from '../../components/hook-form';
import useAuth from 'src/hooks/useAuth';
import { IUpdateUserAvatar, usersService } from 'src/services';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const PHOTO_SIZE = 5000000; // bytes

// ----------------------------------------------------------------------

type FormValuesProps = {
  address: string,
  twitter: string,
  website: string,
  about: string,
  avatar: string,
  coverImage: string
};

export function EditUser() {
  const { currentUser, onUserChange } = useAuth();
  const navigate = useNavigate();

  const UpdateUserSchema = Yup.object().shape({
    about: Yup.string().max(1000, 'Your about section is too long.'),
    website: Yup.string().url('Invalid website URL'),
    twitter: Yup.string().url('Invalid Twitter URL'),
  });

  const defaultValues = {
    address: currentUser.address ?? '',
    twitter: currentUser.twitter ?? '',
    website: currentUser.website ?? '',
    about: currentUser.about ?? '',
    avatar: currentUser.avatar ?? undefined,
    coverImage: currentUser.coverImage ?? undefined
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    mode: 'onBlur',
    defaultValues
  });

  const {
    watch,
    setValue,
    handleSubmit,
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    const user = {
      twitter: values.twitter,
      website: values.website,
      about: values.about
    }
    try {
      const updatedUser = await usersService.updateUserProfile(currentUser.address, user);
      onUserChange(updatedUser);
      navigate(`/user/${currentUser.address}`)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropAvatar = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatar',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        const formData = new FormData();
        formData.append('avatar', file);
        try {
          const updatedUser = await usersService.updateUserAvatar(values.address, formData as unknown as IUpdateUserAvatar)
          onUserChange(updatedUser);
        } catch (error) {
          console.log(error)
        }

      }
    },
    [setValue, onUserChange, values.address]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="avatar"
              accept={FILE_FORMATS}
              maxSize={PHOTO_SIZE}
              onDrop={handleDropAvatar}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png
                  <br /> max size of {fData(PHOTO_SIZE)}
                </Typography>
              }
            />

          </Card>

        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Card sx={{ p: 3 }}>

              <RHFTextField disabled name="address" label="Address" />

              <Box
                sx={{
                  display: 'grid',
                  mt: 3,
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >

                <RHFTextField name="website" label="Website" />
                <RHFTextField name="twitter" label="Twitter" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <RHFTextField name="about" multiline rows={4} label="About" />

                <LoadingButton type="submit" variant="contained">
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
