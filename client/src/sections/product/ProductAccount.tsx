import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
// services
import { productsService } from 'src/services';

// ----------------------------------------------------------------------

const CHALLENGE = 'delete product';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  marginBottom: theme.spacing(1),
}));

const SubtitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  marginBottom: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type FormValuesProps = {
  challenge: string;
};

export function ProductAccount() {
  const navigate = useNavigate();
  const { alias } = useParams();

  const UpdateUserSchema = Yup.object().shape({
    challenge: Yup.string(),
  });

  const defaultValues = {
    challenge: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { watch, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await productsService.deleteProduct(alias!);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Card sx={{ p: 3 }}>
              <LabelStyle>Delete your account</LabelStyle>
              <SubtitleStyle>
                This action <b>cannot</b> be undone. This will permanently delete your product.
                <br />
                Please type "<b>Delete product</b>" to confirm.
              </SubtitleStyle>
              <RHFTextField name="challenge" />

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  disabled={values.challenge.toLowerCase() !== CHALLENGE}
                  color="error"
                  variant="contained"
                >
                  Delete account
                </LoadingButton>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
