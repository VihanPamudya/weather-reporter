# Weather Reporter

A modern React weather application displaying current weather information for Colombo, Sri Lanka, and other cities worldwide.

## 🌟 Features

### Core Requirements
- ✅ **Real-time Weather Data**: Fetches current weather for Colombo, Sri Lanka
- ✅ **Essential Weather Info**: Temperature, Humidity, Wind Speed, UV Index
- ✅ **Clean Interface**: Professional and user-friendly design
- ✅ **Version Control**: Full Git history and proper project structure

## 🚀 Live Demo

[https://weather-reporter-rho.vercel.app/]

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **API**: WeatherAPI.com
- **Icons**: Custom SVG icons
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- WeatherAPI.com account (free)

### Step 1: Clone the Repository
```bash
git clone https://github.com/VihanPamudya/weather-reporter.git
cd weather-reporter
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Get API Key
1. Sign up at [WeatherAPI.com](https://weatherapi.com)
2. Get your free API key from the dashboard
3. Add your API key to `.env`:
```bash
REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
```

### Step 4: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🏗️ Project Structure

├── api/
│   └── weather.js          
├── node_modules/           
├── public/                
├── src/
│   ├── components/
│   │   ├── WeatherApp.js            
│   ├── App.css
│   ├── App.js 
│   ├── index.css           
│   └── index.js            
├── logo.svg                
├── .env                    
├── .gitignore              
├── package-lock.json       
├── package.json            
└── README.md          

**Happy Weather Tracking! 🌤️**
