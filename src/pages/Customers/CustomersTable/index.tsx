import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'

import { REGEX } from 'constants/regex'
import { customersTableHeaders } from 'constants/table'

import { useCustomer } from 'hooks/useCustomer'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'

export const Customers = () => {
  const { t } = useTranslation()

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<{ ra: string }>({
    defaultValues: {
      ra: '',
    },
  })

  const ra = watch('ra')

  const { customerTableData, fetchGetAllCustomers, fetchGetAllCustomersByRa } =
    useCustomer()

  useEffect(() => {
    fetchGetAllCustomers()
  }, [fetchGetAllCustomers])

  useEffect(() => {
    if (ra.length === 13) {
      fetchGetAllCustomersByRa(ra)
    }
    if (ra.length === 0) {
      fetchGetAllCustomers()
    }
  }, [fetchGetAllCustomers, fetchGetAllCustomersByRa, ra])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.users')} </Title>
        <NavLink to={'/customers/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      <TopInfosContainer
        topInfos={[
          {
            title: 'Última ocorrência',
            text: customerTableData[0]?.name ?? '-',
          },
          {
            title: 'Quantidade de ocorrências',
            text: customerTableData?.length.toString() ?? '0',
          },
        ]}
      />

      <Line />

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
            placeholder={t('placeholder.find', { name: 'RA' })}
            onChange={onChange}
            errorMessage={errors.ra?.message}
          />
        )}
      />

      {customerTableData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={customersTableHeaders}
          content={customerTableData.map((customer) => Object.values(customer))}
        />
      )}
    </Container>
  )
}
