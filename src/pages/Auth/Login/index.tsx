import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'

import { Line } from 'components/Line'
import { Input } from 'components/Input'
import { Button } from 'components/Button'

import { LoginFormData } from './types'

import { REGEX } from 'constants/regex'

import Icon from 'assets/icon.svg'

import {
  Banner,
  Container,
  ContainerForm,
  Form,
  FormHeader,
  FormText,
  FormTitle,
  IconImage,
  PasswordForgot,
} from './styles'
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { fetchLogin } = useContext(AuthContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      user: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    await fetchLogin(data)
  }

  return (
    <Container>
      <ContainerForm>
        <Form>
          <FormHeader>
            <IconImage alt="sphynx-icon" src={Icon} />
            <FormTitle> Login </FormTitle>
            <FormText>
              Seu sistema inteligente de segurança e controle de acesso
            </FormText>
          </FormHeader>

          <Line />

          <Controller
            control={control}
            name="user"
            rules={{
              required: t('inputErrors.required'),
              pattern: {
                value: REGEX.email,
                message: t('inputErrors.email'),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder={t('placeholder.default')}
                label={t('inputLabel.email')}
                errorMessage={errors.user?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: t('inputErrors.required'),
              minLength: {
                value: 2,
                message: t('inputErrors.minLength', { length: 2 }),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                value={value}
                onChange={onChange}
                placeholder={t('placeholder.default')}
                label={t('inputLabel.password')}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <PasswordForgot onClick={() => navigate('/auth/password-recovery')}>
            Esqueci minha senha
          </PasswordForgot>
          <Button
            color="PRIMARY_DARK"
            onClick={handleSubmit(onSubmit)}
            text={t('button.login')}
          />
        </Form>
      </ContainerForm>
      <Banner />
    </Container>
  )
}
