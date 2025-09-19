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
import { useAlert } from 'hooks/useAlert'
import { useLocal } from 'hooks/useLocal'
import { useCustomer } from 'hooks/useCustomer'

import { getSphynxAddressDataStorage } from 'storage/storage'

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
import {
  getCustomerBiometrySocket,
  getCustomerTagSocket,
} from 'services/websocket'
import { notify } from 'utils/notification'

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
    customerTableData,
  } = useCustomer()

  const { fetchGetAllLocals, localPageData } = useLocal()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    defaultValues: {
      name: '',
      ra: '',
      tag: '',
      sensorTag: '',
      group: '',
      fingerprint: Number(''),
      sensorBiometry: '',
    },
  })
  const sensorTagValue = watch('sensorTag')
  const sensorBiometryValue = watch('sensorBiometry')

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

  const tagInputFill = useCallback(
    async (ipAddress: string) => {
      try {
        const tagValue = await getCustomerTagSocket(ipAddress)

        setValue('tag', tagValue)
      } catch (error) {
        notify('Conexão falhou', 'error')
      }
    },
    [setValue],
  )

  const biometryInputFill = useCallback(
    async (ipAddress: string) => {
      try {
        const biometry = await getCustomerBiometrySocket(
          ipAddress,
          customerTableData.length,
        )

        setValue('fingerprint', biometry)
      } catch (error) {
        notify('Conexão falhou', 'error')
      }
    },
    [customerTableData.length, setValue],
  )

  const onSubmit = async (data: CreateCustomerFormData) => {
    if (isEditing) {
      await fetchUpdateCustomer(Number(id), data)
    } else {
      await fetchCreateCustomer(data)
    }
  }

  useEffect(() => {
    fetchGetAllGroups()
    fetchGetAllLocals()
  }, [fetchGetAllGroups, fetchGetAllLocals])

  useEffect(() => {
    if (isEditing) {
      fillCustomerFields()
    }
  }, [isEditing, id, fillCustomerFields])

  useEffect(() => {
    const avaliableAddress = getSphynxAddressDataStorage().find(
      (s) => s.mac === sensorTagValue,
    )

    if (avaliableAddress) {
      tagInputFill(avaliableAddress.ip)
    }
  }, [sensorTagValue, tagInputFill])

  useEffect(() => {
    const avaliableAddress = getSphynxAddressDataStorage().find(
      (s) => s.mac === sensorBiometryValue,
    )

    if (avaliableAddress) {
      biometryInputFill(avaliableAddress.ip)
    }
  }, [sensorBiometryValue, biometryInputFill])

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
              name="sensorTag"
              rules={
                {
                  // required: t('inputErrors.required')
                }
              }
              render={({ field: { onChange, value } }) => (
                <Select
                  options={localPageData.map((local) => ({
                    label: local.local.name,
                    value: local.local.mac,
                  }))}
                  onChange={onChange}
                  value={value}
                  label="Selecionar sensor"
                />
              )}
            />
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
                  readOnly
                  errorMessage={errors.tag?.message}
                />
              )}
            />
          </SocketInput>
          <SocketInput>
            <Controller
              control={control}
              name="sensorBiometry"
              rules={
                {
                  // required: t('inputErrors.required')
                }
              }
              render={({ field: { onChange, value } }) => (
                <Select
                  options={localPageData.map((local) => ({
                    label: local.local.name,
                    value: local.local.mac,
                  }))}
                  onChange={onChange}
                  value={value}
                  label="Selecionar sensor"
                />
              )}
            />
            <Controller
              control={control}
              name="fingerprint"
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
                  label="Biometria"
                  readOnly
                  errorMessage={errors.tag?.message}
                />
              )}
            />
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
