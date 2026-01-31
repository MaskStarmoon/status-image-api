FROM node:16-bullseye

# =========================
# Install deps untuk canvas
# =========================
RUN apt-get update && apt-get install -y \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  build-essential \
  python3 \
  pkg-config \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# =========================
# App directory
# =========================
WORKDIR /app

# Copy package dulu (biar cache Docker kepake)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy semua file
COPY . .

# =========================
# Expose port
# =========================
EXPOSE 3000

# =========================
# Start app
# =========================
CMD ["node", "index.js"]
