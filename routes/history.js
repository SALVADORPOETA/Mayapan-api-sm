import express from 'express'
import {
  createHistorySection,
  deleteHistorySection,
  getHistory,
  getHistorySection,
  updateHistorySection,
} from '../controllers/history.js'

const router = express.Router()

router.get('/', getHistory)

router.get('/:id', getHistorySection)

router.post('/', createHistorySection)

router.delete('/:id', deleteHistorySection)

router.patch('/:id', updateHistorySection)

export default router
