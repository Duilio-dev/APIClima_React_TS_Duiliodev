import styles from "./App.module.css"
import Alert from "./Components/Alert/Alert"
import Form from "./Components/Form/Form"
import Spinner from "./Components/Spinner/Spinner"
import WeatherDetail from "./Components/WeatherDetail/WeatherDetail"
import useWeather from "./Hooks/useWeather"

function App() {
  
  const { weather, fetchWeather, hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form 
          fetchWeather={fetchWeather}
        />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather}  />}
        {notFound && <Alert>Ciudad No Encontrada</Alert>}
       
      </div>
    </>
  )
}

export default App
