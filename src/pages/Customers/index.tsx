import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { customersTableHeaders } from 'constants/table'

import { useEffect } from 'react'
import { useCustomer } from 'hooks/useCustomer'

import { Table } from 'components/Table'
import { Input } from 'components/Input'
import { Button } from 'components/Button'

import { Container, ContainerHeader, InputsContainer, NoRegisterText, Title } from './styles'
import { Line } from 'components/Line'

export const Customers = () => {
  const { t } = useTranslation()

  const { customerTableData, fetchGetAllCustomers } = useCustomer()

  useEffect(() => {
    fetchGetAllCustomers()
  }, [fetchGetAllCustomers])

  return (
    <Container>
      {/* <Title> {t('title.users')} </Title>
      <InputsContainer>
        <Input placeholder={t('placeholder.default')} />
        <Button text={t('button.filter')} width={90} />
        <NavLink to={'/customers/new'}>
          <Button text={t('button.create')} width={90} />
        </NavLink>
      </InputsContainer>

      {customerTableData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={customersTableHeaders}
          content={customerTableData.map((obj) => Object.values(obj))}
        />
      )} */}
      <ContainerHeader>
        <Title> {t('title.users')} </Title>
        <Button text={t('button.create')} color={"PRIMARY_LIGHT"} />
      </ContainerHeader>

      <Line />
    </Container>
  )
}
