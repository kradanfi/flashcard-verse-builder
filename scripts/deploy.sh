
#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Create a temporary directory for deployment
echo "Preparing deployment..."
rm -rf deploy-temp
mkdir deploy-temp

# Copy built files
cp -r dist/* deploy-temp/

# Add CNAME file if deploying to custom domain (optional)
# echo "yourdomain.com" > deploy-temp/CNAME

echo "Build completed! Files are ready in the 'deploy-temp' directory."
echo "You can now deploy the contents of 'deploy-temp' to your hosting service."
