import { useCallback, useContext, useEffect } from 'react'
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
  SocketInput,
  Title,
} from './styles'
import { Select } from 'components/Select'
import { useLocal } from 'hooks/useLocal'
import { useGroup } from 'hooks/useGroup'
import {
  getCustomerBiometrySocket,
  getCustomerTagSocket,
} from 'services/websocket'
import { notify } from 'utils/notification'
import { getSphynxAddressDataStorage } from 'storage/storage'
import { AuthContext } from 'contexts/AuthContext'
import { useUnit } from 'hooks/useUnit'
import { PermissionMenuEnum } from 'utils/enums/PermissionMenusEnum'

export const UsersCreate = () => {
  const { user } = useContext(AuthContext)

  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    fetchCreateUser,
    fetchGetUserById,
    fetchDeleteUserById,
    fetchUpdateUser,
    userTableData,
  } = useUser()

  const { fetchGetAllUnits, unitPageData } = useUnit()
  const { fetchGetAllLocals, localPageData } = useLocal()
  const { fetchGetAllGroups, groupPageData } = useGroup()

  const { alert } = useAlert()

  const isEditing = !!id && window.location.pathname.includes('/edit/')

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      name: '',
      user: '',
      ra: '',
      tag: undefined,
      unitId: user.isAdmin ? 0 : user.unitId,
      sensorTag: '',
      isAdmin: 'false',
      groupId: 0,
      fingerprint: Number(''),
      sensorBiometry: '',
      permissionMenu: [],
    },
  })

  const isAdminValue = watch('isAdmin') === 'true'
  const sensorTagValue = watch('sensorTag')
  const sensorBiometryValue = watch('sensorBiometry')

  const fillUserFields = useCallback(async () => {
    try {
      const userData = await fetchGetUserById(id as string)

      if (userData) {
        const { name, user, ra, tag, group, permissionMenus } = userData

        setValue('name', name)
        setValue('user', user)
        setValue('ra', ra)
        setValue('tag', tag)
        setValue('groupId', group.id)
        setValue(
          'permissionMenu',
          permissionMenus.map(
            (menu) =>
              PermissionMenuEnum[menu.name as keyof typeof PermissionMenuEnum],
          ),
        )
      }
    } catch (error) {
      console.error(error)
    }
  }, [fetchGetUserById, id, setValue])

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
          userTableData.length,
        )

        setValue('fingerprint', biometry)
      } catch (error) {
        notify('Conexão falhou', 'error')
      }
    },
    [userTableData.length, setValue],
  )

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

  useEffect(() => {
    fetchGetAllGroups()
    fetchGetAllLocals()
    if (user.isAdmin) {
      fetchGetAllUnits()
    }
  }, [fetchGetAllGroups, fetchGetAllLocals, fetchGetAllUnits, user])

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
          {user.isAdmin && (
            <>
              <Controller
                control={control}
                name="isAdmin"
                rules={{
                  required: t('inputErrors.required'),
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={[
                      { label: 'Administrador', value: true.toString() },
                      { label: 'Usuário', value: false.toString() },
                    ]}
                    onChange={onChange}
                    value={value.toString()}
                    label="Selecionar Rule"
                  />
                )}
              />
              {!isAdminValue && (
                <Controller
                  control={control}
                  name="unitId"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      options={unitPageData.map((unit) => ({
                        label: unit.name,
                        value: unit.id,
                      }))}
                      label="Unidade"
                      value={value}
                      onChange={(selectedOption) => onChange(selectedOption)}
                    />
                  )}
                />
              )}
            </>
          )}

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

          {!user.isAdmin && (
            <Controller
              control={control}
              name="permissionMenu"
              render={({ field: { value, onChange } }) => (
                <Select
                  options={Object.values(PermissionMenuEnum).map((menu) => ({
                    label: menu,
                    value: menu,
                  }))}
                  multiple
                  label="Permissões de acesso"
                  value={value}
                  onChange={(selectedOption) => onChange(selectedOption)}
                />
              )}
            />
          )}

          {!user.isAdmin && (
            <Controller
              control={control}
              name="groupId"
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
          )}

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
                    label: local.name,
                    value: local.mac,
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
                    label: local.name,
                    value: local.mac,
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
