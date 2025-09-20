import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { Button } from 'components/Button'

import { REGEX } from 'constants/regex'
import { CreateUserFormData } from './types'

import { useAlert } from 'hooks/useAlert'
import { useUser } from 'hooks/useUser'

import {
  ButtonActions,
  Container,
  ContainerForm,
  ContainerFormAbout,
  ContainerFormMain,
  ContainerHeader,
  FooterActionsContainer,
  FormText,
  FormTitle,
  Title,
} from './styles'

export const UsersCreate = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    fetchCreateUser,
    fetchGetUserById,
    fetchDeleteUserById,
    fetchUpdateUser,
  } = useUser()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      name: '',
      user: '',
      ra: '',
    },
  })

  const fillUserFields = useCallback(async () => {
    try {
      const userData = await fetchGetUserById(id as string)

      if (userData) {
        const { name, user, ra } = userData

        setValue('name', name)
        setValue('user', user)
        setValue('ra', ra)
      }
    } catch (error) {
      console.error(error)
    }
  }, [fetchGetUserById, id, setValue])

  const handleDelete = async () => {
    alert({
      title: 'Deletar Usuário',
      message: 'Deseja realmente deletar este usuário?',
      onConfirm: onConfirmDelete,
    })
  }

  const onConfirmDelete = async () => {
    await fetchDeleteUserById(id as string)
  }

  const handleCancel = () => {
    navigate('/users')
  }

  const onSubmit = async (data: CreateUserFormData) => {
    if (isEditing) {
      await fetchUpdateUser(Number(id), data)
    } else {
      await fetchCreateUser(data)
    }
  }

  useEffect(() => {
    if (isEditing) {
      fillUserFields()
    }
  }, [isEditing, id, fillUserFields])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.users')} </Title>
        <ButtonActions>
          <Button
            onClick={handleCancel}
            text={t('button.cancel')}
            color="ERROR_LIGHT"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            text={isEditing ? t('button.update') : t('button.create')}
            color="PRIMARY_LIGHT"
          />
        </ButtonActions>
      </ContainerHeader>

      <ContainerFormMain>
        <ContainerFormAbout>
          <FormTitle> Dados pessoais </FormTitle>
          <FormText>
            Nesse formulário será possível cadastrar o usuário, para isso
            preencha as informações e clique no botão de salvar.
          </FormText>
        </ContainerFormAbout>
        <ContainerForm>
          <Controller
            control={control}
            name="name"
            rules={{
              required: t('inputErrors.required'),
              pattern: {
                value: REGEX.onlyString,
                message: t('inputErrors.text'),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder={t('placeholder.default')}
                onChange={onChange}
                label="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />

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
                placeholder={t('placeholder.default')}
                onChange={onChange}
                label="Email"
                errorMessage={errors.user?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="ra"
            rules={{
              required: t('inputErrors.required'),
              pattern: {
                value: REGEX.onlyNumbers,
                message: t('inputErrors.number'),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder={t('placeholder.default')}
                onChange={onChange}
                label="RA"
                errorMessage={errors.ra?.message}
              />
            )}
          />
        </ContainerForm>
      </ContainerFormMain>
      <FooterActionsContainer>
        {isEditing && (
          <Button
            onClick={handleDelete}
            text={t('button.delete')}
            color="ERROR_MAIN"
          />
        )}
      </FooterActionsContainer>
    </Container>
  )
}
