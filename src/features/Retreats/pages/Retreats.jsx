import { retreatApi } from '@/api/retreatApi'
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
import { AddEditRetreatForm } from '../components/AddEditRetreatForm'
import { RetreatFilter } from '../components/RetreatFilter'
import { RetreatList } from '../components/RetreatList'
import { UploadThumbnailForm } from '../components/UploadThumbnailForm'

export default function Retreats() {
  const [filter, setFilter] = useState({ page: 1, limit: 6 })
  const [retreatList, setRetreatList] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 6, totalPages: 0, total: 0 })
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [removeItem, setRemoveItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [uploadItem, setUploadItem] = useState(null)

  const formRef = useRef()
  const uploadRef = useRef()

  const fetchData = useCallback(async (filter) => {
    setLoading(true)
    try {
      const { data, pagination } = await retreatApi.getAll(filter)
      setRetreatList(data)
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
    setSelectedItem(null)
    setRemoveItem(null)
    setUploadItem(null)
  }

  const handleEdit = (retreat) => {
    setSelectedItem(retreat)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setSelectedItem(null)
    setShowForm(true)
  }

  const handleRemove = (retreat) => {
    setRemoveItem(retreat)
  }

  const handleSubmit = async (data) => {
    setIsPending(true)
    try {
      if (selectedItem) {
        await retreatApi.update(selectedItem._id, data)
      } else {
        await retreatApi.create(data)
      }
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
      await retreatApi.remove(removeItem._id)
      fetchData(filter)
      handleClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  const handleUpload = async (formData) => {
    setIsPending(true)
    try {
      await retreatApi.uploadThumbnail(uploadItem.id, formData)
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
                Quản lý Khóa tu
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
          <RetreatFilter onFilterChange={handleFilterChange} />
        </Box>

        <Box>
          {loading ? (
            <Typography>Loading ...</Typography>
          ) : (
            <Stack spacing={3}>
              <Box>
                <RetreatList
                  retreatList={retreatList}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  onUpload={(item) => setUploadItem(item)}
                />
              </Box>
              {pagination.totalPages > 0 && (
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Pagination
                    page={filter.page}
                    count={pagination.totalPages}
                    onChange={(_, page) => setFilter((prev) => ({ ...prev, page }))}
                  />
                </Stack>
              )}
            </Stack>
          )}
        </Box>
      </Stack>

      <Dialog fullWidth maxWidth="md" open={showForm}>
        <DialogTitle variant="h5" fontWeight={600}>
          {selectedItem ? 'Cập nhật Retreat' : 'Tạo mới Retreat'}
        </DialogTitle>
        <DialogContent>
          <AddEditRetreatForm
            ref={formRef}
            data={selectedItem}
            loading={isPending}
            onSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} disabled={isPending}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={() => formRef.current?.submit()}
            disabled={isPending}
          >
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
            Bạn có chắc chắn muốn xóa Retreat <strong>{removeItem?.title}</strong> không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} disabled={isPending}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isPending}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="md" open={!!uploadItem}>
        <DialogTitle variant="h5" fontWeight={600}>
          Upload hình ảnh
        </DialogTitle>
        <DialogContent>
          <UploadThumbnailForm
            ref={uploadRef}
            data={uploadItem}
            loading={isPending}
            onSubmit={handleUpload}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} disabled={isPending}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={() => uploadRef.current?.submit()}
            disabled={isPending}
          >
            {uploadItem ? 'Lưu' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
