export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { city } = req.query;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    if (!city) {
        res.status(400).json({ error: 'City parameter is required' });
        return;
    }

    if (!API_KEY) {
        res.status(500).json({ error: 'Weather API key not configured' });
        return;
    }

    try {
        const weatherResponse = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
        );

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 400) {
                res.status(404).json({ error: `City "${city}" not found` });
                return;
            }
            throw new Error(`Weather API responded with status: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        res.status(200).json(weatherData);

    } catch (error) {
        console.error('Weather API Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch weather data',
            details: error.message 
        });
    }
}