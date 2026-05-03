# Cloud Run Deployment Script for Bharat Nirvachan Assistant
# Replace [PROJECT_ID] with your actual Google Cloud Project ID

$PROJECT_ID = "elec-prompt-1"
$SERVICE_NAME = "bharat-nirvachan-assistant"
$REGION = "us-central1"

Write-Host "Starting Deployment to Google Cloud Run..." -ForegroundColor Cyan

# 1. Build the container image using Cloud Build
Write-Host "Step 1: Building Container Image..." -ForegroundColor Yellow
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# 2. Deploy to Cloud Run
Write-Host "Step 2: Deploying to Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $SERVICE_NAME `
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated

Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Your app will be available at the URL provided above." -ForegroundColor White
