import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { customersTableHeaders } from 'constants/table'

import { useCustomer } from 'hooks/useCustomer'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Button } from 'components/Button'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'

export const Customers = () => {
  const { t } = useTranslation()

  const { customerTableData, fetchGetAllCustomers } = useCustomer()

  useEffect(() => {
    fetchGetAllCustomers()
  }, [fetchGetAllCustomers])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.users')} </Title>
        <NavLink to={'/customers/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      {customerTableData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={customersTableHeaders}
          content={[['ID', 'Nome', 'RA', 'Tag', 'Grupo']]}
        />
      )}
    </Container>
  )
}
