import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { Button } from 'components/Button'

import { REGEX } from 'constants/regex'

import { useGroup } from 'hooks/useGroup'

import { CreateGroupFormData } from './types'

import {
  ButtonActions,
  Container,
  ContainerForm,
  ContainerFormAbout,
  ContainerFormMain,
  ContainerHeader,
  FormText,
  FormTitle,
  Title,
} from './styles'
import { useAlert } from 'hooks/useAlert'

export const GroupsCreate = () => {
  const { id } = useParams()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { fetchCreateGroup, fetchGetGroupById, fetchDeleteGroupById } =
    useGroup()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateGroupFormData>({
    defaultValues: {
      name: '',
    },
  })

  const fillGroupsFields = useCallback(async () => {
    try {
      const groupData = await fetchGetGroupById(id as string)

      if (groupData) {
        setValue('name', groupData.name)
      }
    } catch (error) {
      console.error(error)
    }
  }, [fetchGetGroupById, id, setValue])

  const handleDelete = async () => {
    alert({
      onConfirm: onConfirmDelete,
      title: 'Deletar Grupo',
      message: 'Deseja realmente deletar este grupo?',
    })
  }

  const onConfirmDelete = async () => {
    await fetchDeleteGroupById(id as string)
  }

  const handleCancel = () => {
    navigate('/groups')
  }

  const onSubmit = async (data: CreateGroupFormData) => {
    if (isEditing) {
      // fetchUpdateGroup(data)
    } else {
      fetchCreateGroup(data)
    }
  }

  useEffect(() => {
    if (isEditing) {
      fillGroupsFields()
    }
  }, [isEditing, id, fillGroupsFields])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.groups')} </Title>
        <ButtonActions>
          <Button
            onClick={handleCancel}
            text={t('button.cancel')}
            color="ERROR_LIGHT"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            text={t('button.create')}
            color="PRIMARY_LIGHT"
          />
        </ButtonActions>
      </ContainerHeader>
      <ContainerFormMain>
        <ContainerFormAbout>
          <FormTitle> Dados do grupo </FormTitle>
          <FormText>
            Nesse formulário será possível cadastrar o grupo, para isso preencha
            as informações e clique no botão de cadastrar.
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
                onChange={onChange}
                placeholder={t('placeholder.default')}
                label="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />
        </ContainerForm>
      </ContainerFormMain>
    </Container>
  )
}
