import express from 'express'
import {
  createCity,
  deleteCity,
  getCities,
  getCity,
  updateCity,
} from '../controllers/cities.js'

const router = express.Router()

router.get('/', getCities)

router.get('/:id', getCity)

router.post('/', createCity)

router.delete('/:id', deleteCity)

router.patch('/:id', updateCity)

export default router
