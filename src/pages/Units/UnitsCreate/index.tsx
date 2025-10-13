import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { Button } from 'components/Button'

import { REGEX } from 'constants/regex'

import { CreateUnitFormData } from './types'

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
import { useUnit } from 'hooks/useUnit'

export const UnitsCreate = () => {
  const { id } = useParams()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    fetchCreateUnit,
    fetchGetUnitById,
    fetchDeleteUnitById,
    fetchUpdateUnit,
  } = useUnit()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUnitFormData>({
    defaultValues: {
      name: '',
    },
  })

  const fillUnitsFields = useCallback(async () => {
    try {
      const unitData = await fetchGetUnitById(id as string)

      if (unitData) {
        setValue('name', unitData.name)
      }
    } catch (error) {
      console.error(error)
    }
  }, [fetchGetUnitById, id, setValue])

  const handleDelete = async () => {
    alert({
      onConfirm: onConfirmDelete,
      title: 'Deletar Unidade',
      message: 'Deseja realmente deletar esta unidade?',
    })
  }

  const onConfirmDelete = async () => {
    await fetchDeleteUnitById(id as string)
  }

  const handleCancel = () => {
    navigate('/units')
  }

  const onSubmit = async (data: CreateUnitFormData) => {
    if (isEditing) {
      await fetchUpdateUnit(Number(id), data)
    } else {
      await fetchCreateUnit(data)
    }
  }

  useEffect(() => {
    if (isEditing) {
      fillUnitsFields()
    }
  }, [isEditing, id, fillUnitsFields])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.units')} </Title>
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
          <FormTitle> Dados da unidade </FormTitle>
          <FormText>
            Nesse formulário será possível cadastrar a unidade, para isso
            preencha as informações e clique no botão de cadastrar.
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
