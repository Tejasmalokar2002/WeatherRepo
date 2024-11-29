import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (city) {
      setLoading(true);
      setWeather(null);
      setError(null);
      try {
        const apiKey = "2572f0f443c6c66e5ed616dd9190a6fb";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("City not found");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-purple-900 relative"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="w-72 h-72 bg-blue-500 rounded-full absolute blur-3xl opacity-50"
          style={{ top: "20%", left: "10%" }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="w-96 h-96 bg-purple-500 rounded-full absolute blur-3xl opacity-50"
          style={{ bottom: "10%", right: "5%" }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
      </div>

      {/* Heading */}
      <Typography
        variant="h3"
        className="text-white font-extrabold mb-8 z-10"
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
         Weather Dashboard
      </Typography>

      {/* Input and Button */}
      <motion.div
        className="flex flex-col items-center gap-4 w-full sm:w-96 z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <TextField
          label="Enter City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-white/80 rounded-lg shadow-xl"
          InputProps={{
            style: { fontSize: "1.2rem" },
          }}
        />
        <Button
          variant="contained"
          onClick={fetchWeather}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold shadow-2xl"
        >
          Get Weather
        </Button>
      </motion.div>

      {/* Loading Spinner */}
      {loading && (
        <motion.div
          className="mt-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CircularProgress size={60} className="text-blue-500" />
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          className="mt-6 z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" className="text-red-500 font-bold">
            {error}
          </Typography>
        </motion.div>
      )}

      {/* Weather Card */}
      {weather && (
        <motion.div
          className="mt-8 w-full sm:w-96 z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className="bg-white/20 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl"
          >
            <CardContent>
              <Typography
                variant="h4"
                className="text-center font-extrabold text-black mb-2"
              >
                {weather.name}
              </Typography>
              <Typography
                variant="h6"
                className="text-center text-black font-medium"
              >
                Temperature: {weather.main.temp} °C
              </Typography>
              <Typography
                variant="h6"
                className="text-center capitalize text-black font-medium"
              >
                Weather: {weather.weather[0].description}
              </Typography>
              <Typography
                variant="h6"
                className="text-center text-black font-medium"
              >
                Humidity: {weather.main.humidity} %
              </Typography>
              <Typography
                variant="h6"
                className="text-center text-black font-medium"
              >
                Wind Speed: {weather.wind.speed} m/s
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Weather;
