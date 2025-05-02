import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { Select } from 'components/Select'

import { REGEX } from 'constants/regex'

import { useAlert } from 'hooks/useAlert'
import { useLocal } from 'hooks/useLocal'
import { useGroup } from 'hooks/useGroup'
import { useLocalsCreate } from './hooks/useLocalsCreate'

import { CreateLocalFormData } from './types'

import {
  FooterActionsContainer,
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

export const LocalsCreate = () => {
  const { id } = useParams()

  const { t } = useTranslation()

  const navigate = useNavigate()

  const { handleGetAllMacs, macs } = useLocalsCreate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fetchGetAllGroups, groupPageData } = useGroup()

  const {
    fetchCreateLocal,
    fetchGetLocalById,
    fetchDeleteLocalById,
    fetchUpdateLocal,
  } = useLocal()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateLocalFormData>({
    defaultValues: {
      name: '',
      mac: '',
      groups: [],
    },
  })

  const fillLocalFields = useCallback(async () => {
    try {
      const localGroupData = await fetchGetLocalById(id as string)
      if (localGroupData) {
        setValue('name', localGroupData.local.name)
        setValue('mac', localGroupData.local.mac)
        setValue('groups', [localGroupData.groups[0].id.toString()])
      }
    } catch (error) {
      console.error(error)
    }
  }, [fetchGetLocalById, id, setValue])

  const handleDelete = async () => {
    alert({
      onConfirm: onConfirmDelete,
      title: 'Deletar Local',
      message: 'Deseja realmente deletar este local?',
    })
  }

  const onConfirmDelete = async () => {
    await fetchDeleteLocalById(id as string)
  }

  const handleCancel = () => {
    navigate('/locals')
  }

  const onSubmit = async (data: CreateLocalFormData) => {
    data.groups = [Number(data.groups)]

    console.log('data', data)

    if (isEditing) {
      await fetchUpdateLocal(Number(id), data)
    } else {
      await fetchCreateLocal(data)
    }
  }

  useEffect(() => {
    fetchGetAllGroups()
    handleGetAllMacs()
  }, [fetchGetAllGroups, handleGetAllMacs])

  useEffect(() => {
    if (isEditing) {
      fillLocalFields()
    }
  }, [isEditing, id, fillLocalFields])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.locals')} </Title>
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
          <FormTitle> Dados do local </FormTitle>
          <FormText>
            Nesse formulário será possível cadastrar o local, para isso preencha
            as informações e clique no botão de cadastrar. Lembrando que os MACs
            no select são os disponíveis na sua rede.
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

          <Controller
            control={control}
            name="mac"
            render={({ field: { value, onChange } }) => (
              <Select
                options={macs ?? []}
                label="Mac"
                value={value}
                onChange={(selectedOption) => onChange(selectedOption)}
              />
            )}
          />

          <Controller
            control={control}
            name="groups"
            render={({ field: { value, onChange } }) => (
              <Select
                options={groupPageData.map((group) => ({
                  label: group.name,
                  value: group.id.toString(),
                }))}
                label="Grupos"
                value={value}
                onChange={(selectedOption) => onChange(selectedOption)}
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
