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

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'
import { useUnit } from 'hooks/useUnit'

export const Units = () => {
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

  const { unitPageData, fetchGetAllUnits, fetchGetAllUnitsByName } = useUnit()

  useEffect(() => {
    fetchGetAllUnits()
  }, [fetchGetAllUnits])

  useEffect(() => {
    if (name.length > 0) {
      fetchGetAllUnitsByName(name)
    }
    if (name.length === 0) {
      fetchGetAllUnits()
    }
  }, [fetchGetAllUnits, fetchGetAllUnitsByName, name])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.units')} </Title>
        <NavLink to={'/units/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      <TopInfosContainer
        topInfos={[
          {
            title: 'Última ocorrência',
            text: unitPageData[0]?.name ?? '-',
          },
          {
            title: 'Quantidade de ocorrências',
            text: unitPageData?.length.toString() ?? '-',
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

      {unitPageData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={groupsTableHeaders}
          content={unitPageData.map((obj) => Object.values(obj))}
        />
      )}
    </Container>
  )
}
