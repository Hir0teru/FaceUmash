import { Grid, Box } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Image from 'next/image'
import Loading from '../components/loading'
import Error from '../components/error'
import { fetcher } from '../lib/fetcher'

const Ranking: NextPage = () => {
  const { data, error } = useSWR('/api/ranking', fetcher)

  if (error) return <Error message={error?.message} />
  if (!data) return <Loading />

  const cols: GridColDef[] = [
    {
      field: 'rank',
      headerName: 'RANK',
      filterable: false,
      flex: 10,
      align: 'center',
    },
    {
      field: 'image',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Image src={params.value} alt={params.value} width={100} height={100} />
      ),
      flex: 25,
      align: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'name',
      headerName: '',
      sortable: false,
      filterable: false,
      flex: 65,
      align: 'left',
      disableColumnMenu: true,
    },
  ]

  const {
    createdAt,
    ranking,
  }: {
    createdAt: string
    ranking: {
      id: string
      name: string
      image: string
    }[]
  } = data?.result

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={6}
          sx={{
            height: '100%',
            margin: 'auto',
          }}
          data-testid='table'
        >
          <Box sx={{ typography: 'subtitle2' }} textAlign={'right'} data-testid='updatedAt'>
            最終更新：{createdAt}
          </Box>
          <DataGrid
            density='compact'
            columns={cols}
            rows={ranking}
            isRowSelectable={() => false}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Ranking
