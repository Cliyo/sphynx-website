import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { groupsTableHeaders } from 'constants/table'

import { Table } from 'components/Table'
import { Button } from 'components/Button'

import { useGroup } from 'hooks/useGroup'
import { Container, ContainerHeader, NoRegisterText, Title } from './styles'
import { Line } from 'components/Line'

export const Groups = () => {
  const { t } = useTranslation()

  const { groupPageData, fetchGetAllGroups } = useGroup()

  useEffect(() => {
    fetchGetAllGroups()
  }, [fetchGetAllGroups])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.groups')} </Title>
        <NavLink to={'/groups/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      {groupPageData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={groupsTableHeaders}
          content={groupPageData.map((obj) => Object.values(obj))}
        />
      )}
    </Container>
  )
}
