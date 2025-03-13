import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { Select } from 'components/Select'

import { REGEX } from 'constants/regex'
import { CreateCustomerFormData } from './types'

import { useGroup } from 'hooks/useGroup'
import { useCustomer } from 'hooks/useCustomer'

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
  SocketInput,
  Title,
} from './styles'
import { useAlert } from 'hooks/useAlert'

export const CustomersCreate = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { fetchGetAllGroups, groupPageData } = useGroup()
  const {
    fetchCreateCustomer,
    fetchGetCustomerById,
    fetchDeleteCustomerById,
    fetchUpdateCustomer,
  } = useCustomer()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    defaultValues: {
      name: '',
      ra: '',
      tag: 'teste',
      group: '',
    },
  })

  const fillCustomerFields = useCallback(async () => {
    try {
      const customerData = await fetchGetCustomerById(id as string)

      if (customerData) {
        const { name, ra, tag, group } = customerData
        const groupValue = group.id.toString()

        setValue('name', name)
        setValue('ra', ra)
        setValue('group', groupValue)
        setValue('tag', tag)
      }
    } catch (error) {
      console.error(error)
    }
  }, [fetchGetCustomerById, id, setValue])

  const handleDelete = async () => {
    alert({
      title: 'Deletar Usuário',
      message: 'Deseja realmente deletar este usuário?',
      onConfirm: onConfirmDelete,
    })
  }

  const onConfirmDelete = async () => {
    await fetchDeleteCustomerById(id as string)
  }

  const handleCancel = () => {
    navigate('/customers')
  }

  const onSubmit = async (data: CreateCustomerFormData) => {
    if (isEditing) {
      await fetchUpdateCustomer(Number(id), data)
    } else {
      await fetchCreateCustomer(data)
    }
  }

  useEffect(() => {
    fetchGetAllGroups()
  }, [fetchGetAllGroups])

  useEffect(() => {
    if (isEditing) {
      fillCustomerFields()
    }
  }, [isEditing, id, fillCustomerFields])

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
          <FormTitle> Dados pessoais e institucionais </FormTitle>
          <FormText>
            Nesse formulário será possível cadastrar o usuário, para isso
            preencha as informações e clique no botão de cadastrar tag para
            ativar a leitura no sensor de tags
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

          <Controller
            control={control}
            name="group"
            render={({ field: { value, onChange } }) => (
              <Select
                options={groupPageData.map((group) => ({
                  label: group.name,
                  value: group.id.toString(),
                }))}
                label="Grupo"
                value={value}
                onChange={(selectedOption) => onChange(selectedOption)}
              />
            )}
          />

          <SocketInput>
            <Controller
              control={control}
              name="tag"
              rules={
                {
                  // required: t('inputErrors.required')
                }
              }
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder={t('placeholder.waiting')}
                  label="TAG"
                  errorMessage={errors.tag?.message}
                />
              )}
            />
            <Button color="PRIMARY_DARK" text={t('button.tag')} />
          </SocketInput>
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
