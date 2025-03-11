import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { accessTableHeaders } from 'constants/table'

import { Line } from 'components/Line'
import { Table } from 'components/Table'

import { useAccess } from 'hooks/useAccess'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'

export const Access = () => {
  const { t } = useTranslation()

  const { accessTableData, fetchGetAllAccess } = useAccess()

  useEffect(() => {
    fetchGetAllAccess()
  }, [fetchGetAllAccess])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.users')} </Title>
      </ContainerHeader>

      <Line />

      {accessTableData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={accessTableHeaders}
          content={accessTableData.map((obj) => Object.values(obj))}
        />
      )}
    </Container>
  )
}
