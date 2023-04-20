import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {ReportsTable} from '../../../_metronic/partials/widgets'

const Reports: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Reports</PageTitle>
      <ReportsTable className='' />
    </>
  )
}

export default Reports
