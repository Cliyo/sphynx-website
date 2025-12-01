import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { REGEX } from 'constants/regex'
import { groupsTableHeaders } from 'constants/table'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { useGroup } from 'hooks/useGroup'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'

export const Groups = () => {
  const { t } = useTranslation()

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  })

  const name = watch('name')

  const { groupPageData, fetchGetAllGroups, fetchGetAllGroupsByName } =
    useGroup()

  useEffect(() => {
    fetchGetAllGroups()
  }, [fetchGetAllGroups])

  useEffect(() => {
    if (name.length > 0) {
      fetchGetAllGroupsByName(name)
    }
    if (name.length === 0) {
      fetchGetAllGroups()
    }
  }, [fetchGetAllGroups, fetchGetAllGroupsByName, name])
  console.log(groupPageData)

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.groups')} </Title>
        <NavLink to={'/groups/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      <TopInfosContainer
        topInfos={[
          {
            title: 'Última ocorrência',
            text: groupPageData[0]?.name ?? '-',
          },
          {
            title: 'Quantidade de ocorrências',
            text: groupPageData?.length.toString() ?? '-',
          },
        ]}
      />

      <Line />

      <Controller
        control={control}
        name="name"
        rules={{
          required: t('inputErrors.required'),
          pattern: {
            value: REGEX.onlyString,
            message: t('inputErrors.number'),
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            placeholder={t('placeholder.find', { name: 'nome' })}
            onChange={onChange}
            errorMessage={errors.name?.message}
          />
        )}
      />

      {groupPageData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={groupsTableHeaders}
          content={groupPageData.map((obj) => {
            return [obj.id, obj.name]
          })}
        />
      )}
    </Container>
  )
}
