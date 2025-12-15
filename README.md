# HoloZing Dust Compare

A modern, dark-themed frontend tool designed for the HoloZing community to track and compare December 2025 ZingDust bonus earnings between players.

## 🚀 Features

### 👥 Player Comparison
- **Multi-Player Support**: Compare anywhere from **2 to 4 players** simultaneously.
- **Dynamic Inputs**: Easily add or remove player slots on the fly using the interface.
- **Real-Time Data**: Fetches live historical data from the HoloZing API.

### 📊 Rich Visualizations
- **Stats Dashboard**:
  - **Total Earned**: Aggregate ZingDust earnings for the month.
  - **Daily Average**: Performance metrics calculation.
  - **Best Day**: Highlights the date and amount of the highest earning day.
  - **Winner Highlight**: Automatically flags the top earner with a gold trophy and glow effect.
  - **Avatars**: Automatically fetches and displays Hive user avatars.

- **Interactive Trend Chart**:
  - Smooth area chart visualizing earning trends over the month.
  - distinct, color-coded series for each player.
  - Interactive hover tooltips for precise daily values.

- **Calendar History**:
  - A comprehensive calendar grid view for December 2025.
  - Detailed daily breakdown of earnings for all compared players within each day cell.
  - Scrollable cells to handle multiple data points.

### 🎨 UI/UX Design
- **Cyber/Space Aesthetic**: Built with a "Holo" inspired dark theme using Tailwind CSS, featuring gradients and glass-morphism effects.
- **Responsive Layout**: Seamlessly adapts from desktop grids to mobile stacks.
- **Error Handling**: Graceful error messages for invalid usernames or API connection issues.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: HoloZing History API (proxied for CORS support)

## 📦 How to Deploy to GitHub Pages

This project is configured to deploy manually to GitHub Pages using `gh-pages`.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Deploy**:
    ```bash
    npm run deploy
    ```
    This command will run the build process and automatically push the output to the `gh-pages` branch of your repository.

3.  **Configure GitHub Settings**:
    Go to your repository Settings > Pages > Build and deployment > Source, and ensure it is set to "Deploy from a branch" and select `gh-pages` / `root`.

## 🤝 Credits

**Proudly presented by @louis88**

If you find this tool useful, consider voting for **louis.witness** as a Witness for the Hive Blockchain.

---
*Note: This tool uses a CORS proxy to fetch data from the HoloZing API in a client-side environment to bypass browser restrictions.*