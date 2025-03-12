import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { accessTableHeaders } from 'constants/table'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { useAccess } from 'hooks/useAccess'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'
import { Input } from 'components/Input'

export const Access = () => {
  const { t } = useTranslation()

  const { accessTableData, fetchGetAllAccess } = useAccess()

  useEffect(() => {
    fetchGetAllAccess()
  }, [fetchGetAllAccess])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.access')} </Title>
      </ContainerHeader>

      <Line />

      <TopInfosContainer
        topInfos={[
          { title: 'Último local', text: accessTableData[0].local.name },
          { title: 'Último usuário', text: accessTableData[0].customer.name },
          {
            title: 'Situação',
            text: accessTableData[0].situation ? 'Aprovado' : 'Negado',
          },
        ]}
      />

      <Line />

      {accessTableData.length > 0 && (
        <Input
          placeholder={t('placeholder.find', { name: 'nome de usuário' })}
        />
      )}

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
