import { adminApi } from '@/api/adminApi'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AddEditAdminForm } from '../components/AddEditAdminForm'
import { AdminFilter } from '../components/AdminFilter'
import { AdminList } from '../components/AdminList'

export default function Admins() {
  const [filter, setFilter] = useState({ page: 1, limit: 6 })
  const [adminList, setAdminList] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalPages: 0,
    total: 0,
  })
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [removeItem, setRemoveItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const ref = useRef()

  const fetchData = useCallback(async (filter) => {
    setLoading(true)
    try {
      const { data, pagination } = await adminApi.getAll(filter)
      setAdminList(data)
      setPagination(pagination)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const handleClose = () => {
    setShowForm(false)
    setRemoveItem(null)
    setSelectedItem(null)
  }

  const handleEdit = (user) => {
    setSelectedItem(user)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setSelectedItem(null)
    setShowForm(true)
  }

  const handleRemove = (user) => {
    setRemoveItem(user)
  }
  const handleSubmit = async (data) => {
    setIsPending(true)
    try {
      if (selectedItem) {
        await adminApi.update(selectedItem._id, data)
        fetchData(filter)
        handleClose()
        return
      }
      await adminApi.create(data)
      fetchData(filter)
      handleClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  const handleConfirmDelete = async () => {
    setIsPending(true)
    try {
      await adminApi.remove(removeItem._id)
      fetchData(filter)
      handleClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <Container>
      <Stack spacing={3} py={3}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box flexGrow={1}>
              <Typography variant="h5" fontWeight={600}>
                Quản lý nhân viên
              </Typography>
            </Box>

            <Box>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
                Thêm mới
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box>
          <AdminFilter onFilterChange={handleFilterChange} />
        </Box>

        <Box>
          {loading ? (
            <Typography>Loading ...</Typography>
          ) : (
            <Stack spacing={3}>
              <Box>
                <AdminList adminList={adminList} onEdit={handleEdit} onRemove={handleRemove} />
              </Box>

              {pagination.totalPages > 0 && (
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Pagination page={filter.page} count={pagination.totalPages} />
                </Stack>
              )}
            </Stack>
          )}
        </Box>
      </Stack>

      <Dialog fullWidth maxWidth="sm" open={showForm}>
        <DialogTitle variant="h5" fontWeight={600}>
          {selectedItem ? 'Cập nhật dữ liệu' : 'Tạo mới dữ liệu'}
        </DialogTitle>
        <DialogContent>
          <Box>
            <AddEditAdminForm
              ref={ref}
              data={selectedItem}
              loading={isPending}
              onSubmit={handleSubmit}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" onClick={() => ref.current?.submit()}>
            {selectedItem ? 'Lưu' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="sm" open={!!removeItem} onClose={handleClose}>
        <DialogTitle variant="h5" fontWeight={600}>
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa nhân viên <strong>{removeItem?.fullName}</strong> không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} disabled={isPending} loading={isPending}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isPending}
            loading={isPending}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
