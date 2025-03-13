import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { groupsTableHeaders } from 'constants/table'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Button } from 'components/Button'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { useGroup } from 'hooks/useGroup'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'
import { Input } from 'components/Input'

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

      {groupPageData.length > 0 && (
        <>
          <TopInfosContainer
            topInfos={[
              {
                title: 'Último adicionado',
                text: groupPageData[0].name,
              },
              {
                title: 'Quantidade de grupos',
                text: groupPageData.length.toString(),
              },
            ]}
          />

          <Line />

          <Input placeholder={t('placeholder.find', { name: 'nome' })} />
        </>
      )}

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
