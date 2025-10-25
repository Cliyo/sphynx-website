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
import { useAlert } from 'hooks/useAlert'
import { Select } from 'components/Select'
import { WeekDaysEnum } from 'utils/enums/WeekDaysEnum'

export const GroupsCreate = () => {
  const { id } = useParams()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    fetchCreateGroup,
    fetchGetGroupById,
    fetchDeleteGroupById,
    fetchUpdateGroup,
  } = useGroup()

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
      weekDays: [],
    },
  })

  const fillGroupsFields = useCallback(async () => {
    try {
      const groupData = await fetchGetGroupById(id as string)

      if (groupData) {
        setValue('name', groupData.name)
        setValue(
          'weekDays',
          groupData.weekDays.map(
            (day) => WeekDaysEnum[day.name as keyof typeof WeekDaysEnum],
          ),
        )
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
      await fetchUpdateGroup(Number(id), data)
    } else {
      await fetchCreateGroup(data)
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
            text={isEditing ? t('button.update') : t('button.create')}
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

          <Controller
            control={control}
            name="weekDays"
            render={({ field: { value, onChange } }) => (
              <Select
                options={Object.values(WeekDaysEnum).map((day) => ({
                  label: day,
                  value: day,
                }))}
                multiple
                label="Dias da semana"
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
