import styles from './Form.module.css'
import { countries } from '../../data/countries'
import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import type { SerchType } from '../../types'
import Alert from '../Alert/Alert'

type FormProps = {
    fetchWeather: (serch: SerchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {

    const [ search, setSearch ] =useState<SerchType>({
        city: '',
        country: ''
    })
    const [ alert, setAlert ] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }

  return (
    <form 
        className={styles.form}
        onSubmit={handleSubmit}
    >
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
                type="text" 
                name="city" 
                id="city" 
                placeholder="Ciudad"
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>

            <label htmlFor="country">País:</label>
            <select 
                id='country' 
                value={search.country}
                name='country'
                onChange={handleChange}
            >
                <option value="">-- Selecciones un país --</option>
                {countries.map( country => (
                    <option 
                        key={country.code} 
                        value={country.name}
                    >{country.name}</option>
                ))}
            </select>
        </div>

        <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form>
  )
}
