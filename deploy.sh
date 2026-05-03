#!/bin/bash
# Bash Cloud Run Deployment Script for Bharat Nirvachan Assistant

PROJECT_ID="elec-prompt-1"
SERVICE_NAME="bharat-nirvachan-assistant"
REGION="us-central1"

echo -e "\033[1;36mStarting Deployment to Google Cloud Run...\033[0m"

# 1. Build the container image using Cloud Build
echo -e "\033[1;33mStep 1: Building Container Image...\033[0m"
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# 2. Deploy to Cloud Run
echo -e "\033[1;33mStep 2: Deploying to Cloud Run...\033[0m"
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated

echo -e "\033[1;32mDeployment Complete!\033[0m"
echo "Your app will be available at the URL provided above."
