export interface CepData {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  location: Location
}

export interface Location {
  coordinates: Coordinates
}

export interface Coordinates {
  longitude: string
  latitude: string
}
