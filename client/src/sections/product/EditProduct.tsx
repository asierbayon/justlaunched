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
import { IProduct, IUpdateProductLogo, productsService } from 'src/services';
import { useNavigate, useParams } from 'react-router';

// ----------------------------------------------------------------------

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const PHOTO_SIZE = 5000000; // bytes

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  alias: string;
  tagline: string;
  logo: File | string;
  coverImage: File | string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  description: string;
  gallery: string[];
};

interface IEditProductProps {
  product: IProduct;
}

export const EditProduct: React.FC<IEditProductProps> = ({ product }) => {
  const { alias } = useParams();
  const navigate = useNavigate();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(40, 'Your name is too long.'),
    alias: Yup.string().required('Alias is required').max(40, 'Your alias is too long.').matches(/^[a-zA-Z0-9]+$/, 'Your alias cannot contain spaces or special characters'),
    tagline: Yup.string().required('Tagline is required').max(60, 'Your tagline is too long.'),
    website: Yup.string().required('Website is required').url('Invalid website URL').max(150, 'Your website URL is too long.'),
    twitter: Yup.string().url('Invalid Twitter URL').max(150, 'Your Twitter URL is too long.'),
    discord: Yup.string().url('Invalid Discord URL').max(150, 'Your Discord URL is too long.'),
    telegram: Yup.string().url('Invalid Telegram URL').max(150, 'Your Telegram URL is too long.'),
    description: Yup.string().required('Description is required').min(60, 'Your description is too short.').max(1000, 'Your description is too long.'),
  });

  const defaultValues = {
    name: product.name ?? '',
    alias: product.alias ?? '',
    tagline: product.tagline ?? '',
    website: product.website ?? '',
    twitter: product.twitter ?? '',
    discord: product.discord ?? '',
    telegram: product.telegram ?? '',
    description: product.description ?? '',
    logo: product.logo ?? '',

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
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    const product = {
      name: values.name,
      alias: values.alias,
      tagline: values.tagline,
      website: values.website,
      twitter: values.twitter,
      discord: values.discord,
      telegram: values.telegram,
      description: values.description,
    }
    try {
      const updatedUser = await productsService.updateProduct(alias!, product);
      navigate(`/product/${updatedUser.alias}`)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropAvatar = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'logo',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        const formData = new FormData();
        formData.append('logo', file);
        try {
          await productsService.updateProductLogo(product.alias, formData as unknown as IUpdateProductLogo)
        } catch (error) {
          console.log(error)
        }

      }
    },
    [setValue, product.alias]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="logo"
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
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  mb: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="name" label="Name" />
                <RHFTextField name="alias" label="Alias" />
              </Box>

              <RHFTextField name="tagline" label="Tagline" />

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

                <RHFTextField name="discord" label="Discord" />
                <RHFTextField name="telegram" label="Telegram" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <RHFTextField name="description" multiline rows={4} label="Description" />

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
