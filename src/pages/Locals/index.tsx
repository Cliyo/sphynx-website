import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { useLocal } from 'hooks/useLocal'

import { REGEX } from 'constants/regex'
import { localsTableHeaders } from 'constants/table'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'

export const Locals = () => {
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

  const { fetchGetAllLocalByName, fetchGetAllLocals, localPageData } =
    useLocal()

  useEffect(() => {
    fetchGetAllLocals()
  }, [fetchGetAllLocals])

  useEffect(() => {
    if (name.length > 0) {
      fetchGetAllLocalByName(name)
    }
    if (name.length === 0) {
      fetchGetAllLocals()
    }
  }, [fetchGetAllLocals, fetchGetAllLocalByName, name])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.locals')} </Title>
        <NavLink to={'/locals/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      <TopInfosContainer
        topInfos={[
          {
            title: 'Última ocorrência',
            text: localPageData[0]?.local?.name ?? '-',
          },
          {
            title: 'Quantidade de ocorrências',
            text: localPageData?.length.toString() ?? '-',
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

      {localPageData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={localsTableHeaders}
          content={localPageData.map((obj) => Object.values(obj.local))}
        />
      )}
    </Container>
  )
}
