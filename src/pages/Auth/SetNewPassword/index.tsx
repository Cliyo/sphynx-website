import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Banner,
  ContainerForm,
  SetNewPasswordContainer,
  Form,
  FormHeader,
  FormText,
  FormTitle,
  IconImage,
} from './styles'
import { Line } from 'components/Line'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import Icon from 'assets/icon.svg'
import { NewPasswordForm } from './types'
import api from 'services/axios'
import { notify } from 'utils/notification'
import { useNavigate, useParams } from 'react-router-dom'

export const SetNewPassword = () => {
  const { id, hash } = useParams()

  const { t } = useTranslation()

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: NewPasswordForm) => {
    await api.post(`/auth/password-recovery/${id}/${hash}`, {
      password: data.password,
    })

    notify(t('toastMessages.success'), 'success')

    navigate('auth/login')
  }
  return (
    <SetNewPasswordContainer>
      <ContainerForm>
        <Form>
          <FormHeader>
            <IconImage alt="sphynx-icon" src={Icon} />
            <FormTitle> Esqueceu sua senha </FormTitle>
            <FormText>
              Seu sistema inteligente de segurança e controle de acesso
            </FormText>
          </FormHeader>

          <Line />

          <Controller
            control={control}
            name="password"
            rules={{
              required: t('inputErrors.required'),
              minLength: {
                value: 4,
                message: t('inputErrors.minLength', { count: 4 }),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder={t('placeholder.default')}
                label={t('inputLabel.password')}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: t('inputErrors.required'),
              minLength: {
                value: 4,
                message: t('inputErrors.minLength', { count: 4 }),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder={t('placeholder.default')}
                label={t('inputLabel.confirmPassword')}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            color="PRIMARY_DARK"
            onClick={handleSubmit(onSubmit)}
            text={t('button.confirm')}
          />
        </Form>
      </ContainerForm>
      <Banner />
    </SetNewPasswordContainer>
  )
}
