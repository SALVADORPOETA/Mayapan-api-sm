import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const citiesFilePath = path.resolve(__dirname, '../data/cities.json')

let cities = []

const loadCities = () => {
  try {
    const dataBuffer = fs.readFileSync(citiesFilePath)
    const dataJSON = dataBuffer.toString()
    cities = JSON.parse(dataJSON)
  } catch (error) {
    cities = []
  }
}

const saveCities = () => {
  const dataJSON = JSON.stringify(cities, null, 2)
  fs.writeFileSync(citiesFilePath, dataJSON)
}

export const getCities = (req, res) => {
  loadCities()
  res.send(cities)
}

export const getCity = (req, res) => {
  const id = Number(req.params.id)
  loadCities()
  const foundCity = cities.find((city) => city.id === id)
  res.send(foundCity)
}

export const createCity = (req, res) => {
  const city = req.body
  loadCities()
  cities.push(city)
  saveCities()
  res.send(`City with the name ${city.name} added to the database!`)
}

export const deleteCity = (req, res) => {
  const id = Number(req.params.id)
  loadCities()
  cities = cities.filter((city) => city.id !== id)
  saveCities()
  res.send(`City with the id ${id} deleted from the database.`)
}

export const updateCity = (req, res) => {
  const id = Number(req.params.id)
  const { name, image, description, family } = req.body
  loadCities()
  const city = cities.find((city) => city.id === id)
  if (name) city.name = name
  if (image) city.image = image
  if (description) city.description = description
  if (family) city.family = family
  saveCities()
  res.send(`City with the id ${id} has been updated!`)
}
