# TbibVision Backend API

Medical AI analysis backend powered by OpenRouter and Supabase.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
OPENROUTER_API_KEY=your_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3000
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### POST /api/analyze-lab
Analyze lab test image
- **Body**: FormData with `image` field (multipart/form-data)
- **Response**: JSON with lab test results

### POST /api/analyze-skin
Analyze skin image
- **Body**: FormData with `image` field (multipart/form-data)
- **Response**: JSON with skin condition predictions

### POST /api/save-analysis
Save analysis to database
- **Body**: JSON `{ userId, type, imageUrl, results }`
- **Response**: Saved record

### GET /api/doctors
Get list of doctors
- **Query**: `?specialization=Dermatologist` (optional)
- **Response**: Array of doctors

### GET /health
Health check endpoint

