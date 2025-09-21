import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Banner,
  ContainerForm,
  ForgotPasswordContainer,
  Form,
  FormHeader,
  FormText,
  FormTitle,
  IconImage,
} from './styles'
import { Line } from 'components/Line'
import { REGEX } from 'constants/regex'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import Icon from 'assets/icon.svg'

export const ForgotPassword = () => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ user: string }>({
    defaultValues: {
      user: '',
    },
  })

  const onSubmit = async (data: { user: string }) => {
    console.log(data)
  }
  return (
    <ForgotPasswordContainer>
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
          <Button
            color="PRIMARY_DARK"
            onClick={handleSubmit(onSubmit)}
            text={t('button.confirm')}
          />
        </Form>
      </ContainerForm>
      <Banner />
    </ForgotPasswordContainer>
  )
}
