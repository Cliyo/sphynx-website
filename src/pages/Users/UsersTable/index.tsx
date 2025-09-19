import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { usersTableHeaders } from 'constants/table'

import { useUser } from 'hooks/useUser'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Button } from 'components/Button'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { Container, ContainerHeader, NoRegisterText, Title } from './styles'

export const Users = () => {
  const { t } = useTranslation()

  const { userTableData, fetchGetAllUsers } = useUser()

  useEffect(() => {
    fetchGetAllUsers()
  }, [fetchGetAllUsers])

  useEffect(() => {
    fetchGetAllUsers()
  }, [fetchGetAllUsers])

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.users')} </Title>
        <NavLink to={'/users/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      <TopInfosContainer
        topInfos={[
          {
            title: 'Última ocorrência',
            text: userTableData[0]?.name ?? '-',
          },
          {
            title: 'Quantidade de ocorrências',
            text: userTableData?.length.toString() ?? '0',
          },
        ]}
      />

      <Line />

      {userTableData.length === 0 ? (
        <NoRegisterText> {t('tableErrors.noData')} </NoRegisterText>
      ) : (
        <Table
          headers={usersTableHeaders}
          content={userTableData.map((user) => Object.values(user))}
        />
      )}
    </Container>
  )
}
