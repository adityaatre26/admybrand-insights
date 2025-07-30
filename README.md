# ADmyBRAND Insights - Analytics Dashboard

A sophisticated, responsive analytics dashboard built for digital marketing performance monitoring and data visualization.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-38B2AC)

## ✨ Features

### 📊 Interactive Charts & Visualizations

- **Revenue & User Trends** - Real-time line charts with multiple time filters (7 days, 1 month, 1 year)
- **Campaign Performance** - Interactive bar charts showing conversions, clicks, and impressions
- **Traffic Sources** - Dynamic pie charts with interactive legend and data filtering
- **Device Distribution** - Visual breakdown of user device types

### 📱 Responsive Design

- **Mobile-First Approach** - Optimized touch targets and responsive layouts
- **Adaptive Charts** - Charts automatically adjust for mobile screens
- **Touch-Optimized Controls** - Enhanced button interactions for mobile devices
- **Progressive Layout** - Elements reflow intelligently across all screen sizes

### 🎯 Key Metrics Dashboard

- **Real-Time Analytics** - Live metric cards with animated counters
- **Performance Indicators** - Color-coded trend indicators (positive/negative changes)
- **Comparative Data** - Month-over-month and quarter-over-quarter comparisons
- **Quick Insights** - At-a-glance performance summaries

### 📈 Data Management

- **Interactive Data Table** - Sortable campaign performance data
- **Advanced Filtering** - Search and status-based filtering options
- **CSV Export** - Download data for external analysis
- **Pagination** - Efficient data navigation for large datasets

### 🎨 Modern UI/UX

- **Glass Morphism Design** - Contemporary frosted glass effects
- **Dark Theme** - Professional dark mode interface
- **Smooth Animations** - Framer Motion powered transitions
- **Custom Typography** - Outfit font family for modern aesthetics

## 🛠️ Technologies Used

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icon library
- **Font**: Google Fonts (Outfit family)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/adityaatre26/admybrand-vizion.git
cd admybrand-vizion
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open your browser**

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

## 📱 Responsive Features

### Mobile Optimizations

- **Touch-Friendly Buttons** - Minimum 44px touch targets
- **Adaptive Layouts** - Charts and filters stack appropriately
- **Optimized Spacing** - Enhanced gaps between elements on mobile
- **Performance** - Lightweight and fast loading on mobile networks

### Desktop Experience

- **Multi-Column Layouts** - Efficient use of screen real estate
- **Hover Effects** - Rich interactive feedback
- **Keyboard Navigation** - Full accessibility support

## 🎯 Project Structure

```
src/
├── components/           # React components
│   ├── charts/          # Chart components (Bar, Pie, Revenue)
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── DataTable.tsx    # Interactive data table
│   ├── MetricCard.tsx   # Animated metric displays
│   └── Navigation.tsx   # App navigation
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
│   ├── chartDownload.ts # Chart export functionality
│   ├── csvExport.ts     # Data export utilities
│   └── utils.ts         # General utilities
├── pages/               # Page components
└── index.css           # Global styles and design system
```

## 🎨 Design System

### Color Palette

- **Background**: Sophisticated dark grays (6%-11%)
- **Foreground**: High contrast whites and grays
- **Charts**: Carefully selected accessible color palette
- **Interactive Elements**: Primary accent with hover states

### Typography

- **Primary Font**: Outfit (Google Fonts)
- **Weights**: 300-900 for optimal hierarchy
- **Features**: OpenType features enabled

### Effects

- **Glass Morphism**: Subtle backdrop blur effects
- **Shadows**: Multi-layered depth system
- **Gradients**: Smooth background transitions

## 📊 Data Features

### Export Capabilities

- **PNG Export** - High-quality chart images
- **CSV Export** - Raw data for analysis
- **Responsive Downloads** - Works seamlessly on all devices

### Interactive Elements

- **Chart Filtering** - Toggle data series on/off
- **Time Range Selection** - Multiple time period views
- **Hover Tooltips** - Detailed data on interaction
- **Real-time Updates** - Animated value changes

## 🔧 Customization

### Adding New Charts

1. Create component in `src/components/charts/`
2. Follow existing chart patterns for consistency
3. Implement responsive design and export functionality

### Modifying Color Scheme

- Update CSS variables in `src/index.css`
- Maintain accessibility contrast ratios
- Test across all chart components

### Adding New Metrics

- Extend the metrics array in `Dashboard.tsx`
- Follow the existing MetricCard pattern
- Ensure proper animation and responsive behavior

