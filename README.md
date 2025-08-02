# Zenanalyst - Revenue Analytics Dashboard

Zenanalyst is a comprehensive analytics platform for financial data visualization that combines a **Java Spring Boot backend** with a **React frontend** to deliver interactive revenue analysis dashboards.  
The application retrieves JSON data from AWS S3 and provides AI-powered insights through Google's Gemini API integration.

---

## Architecture Overview

The project follows a modern full-stack architecture with clear separation of concerns:

- **Backend**: Java Spring Boot RESTful API with AWS S3 integration  
- **Frontend**: React SPA with Ant Design components and data visualization  
- **Data Storage**: AWS S3 for JSON data files  
- **AI Integration**: Google Gemini API for intelligent data analysis  
- **Visualization**: Recharts library for interactive charts and graphs  

---

## Features

### Data Analytics Modules
- **Quarterly Revenue Analysis** – Track quarterly performance and QoQ growth metrics  
- **Revenue Bridge & Churn Analysis** – Analyze revenue transitions and customer churn  
- **Geographic Revenue Analysis** – Country and region-wise revenue breakdowns  
- **Customer Concentration Analysis** – Monitor customer revenue distribution patterns  

### Key Capabilities
- Interactive Dashboards with filtering and search functionality
- AI-Powered Chat Interface for natural language data queries
- Real-time Data Visualization with responsive charts and metrics cards
- RESTful API with OpenAPI/Swagger documentation
- Comprehensive Error Handling across frontend and backend

---

## Prerequisites

- **Java 21+** (for Spring Boot backend)
- **Node.js 16+** and npm (for React frontend)
- AWS Account with S3 access
- Google Cloud Account with Gemini API access

---

## Environment Setup

### Backend Configuration

Create a `.env` file in the `json-s3-api` directory:

```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

## Frontend Configuration

Create a `.env` file in the `json-s3-frontend` directory:

```bash
REACT_APP_API_URL=http://localhost:8080/api/v1
```

## Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/ruveix/Zenanalyst.git](https://github.com/ruveix/Zenanalyst.git)
    cd Zenanalyst
    ```

2.  **Backend Setup**
    ```bash
    cd json-s3-api
    # Install dependencies and run
    mvn clean install
    mvn spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.
    
    **API Documentation**: Access Swagger UI at `http://localhost:8080/swagger-ui.html`.

3.  **Frontend Setup**
    ```bash
    cd json-s3-frontend
    # Install dependencies
    npm install
    # Start development server
    npm start
    ```
    The frontend application will be available at `http://localhost:3000`.

---
## Live Demo & Deployment

The application has been successfully deployed and is fully operational.

* **Frontend (Netlify)**: [https://subtle-vacherin-218498.netlify.app/](https://subtle-vacherin-218498.netlify.app/)
* **Backend API & Swagger UI (Railway)**: [https://zenanalyst-production.up.railway.app/swagger-ui.html](https://zenanalyst-production.up.railway.app/swagger-ui.html)

The backend, hosted on **Railway**, is connected to the frontend, hosted on **Netlify**. The live application fetches JSON data files directly from an AWS S3 bucket and visualizes the data in the React frontend.
---

## Data Preparation

Upload your JSON data files to your S3 bucket with the following naming convention:
* `A._Quarterly_Revenue_and_QoQ_growth.json`
* `B._Revenue_Bridge_and_Churned_Analysis.json`
* `C._Country_wise_Revenue_Analysis.json`
* `D._Region_wise_Revenue_Analysis.json`
* `E._Customer_Concentration_Analysis.json`

---

## Module Architecture

### Backend Modules (`json-s3-api`)

#### Controllers Layer
* `DataController`: RESTful endpoints for retrieving analytics data from S3.
* `AiChatController`: Handles AI chat interactions with Gemini API.

#### Service Layer
* `S3Service`: Encapsulates all AWS S3 operations and file retrieval logic.

#### Configuration
* `AwsConfig`: AWS S3 client configuration with credentials management.
* `CorsConfig`: Cross-origin resource sharing setup for frontend integration.

#### Exception Handling
* `GlobalExceptionHandler`: Centralized error handling with structured JSON responses.
* `ApiException`: Custom exception class for API-specific errors.
* `ErrorResponse`: Standardized error response format.

---

### Frontend Modules (`json-s3-frontend`)

#### Pages Layer
* `QuarterlyDashboard`: Quarterly revenue analysis with filtering capabilities.
* `BridgeDashboard`: Revenue bridge and churn analysis visualization.
* `CountryDashboard`: Geographic revenue analysis interface.
* `ConcentrationDashboard`: Customer concentration analytics.

#### Components Layer
* `MetricsCard`: Reusable component for displaying key performance indicators.
* `DataTable`: Enhanced table component with pagination and search.
* `Charts`: Bar and pie chart components with percentage calculations.
* `ChatInterface`: AI-powered chat interface for data queries.

#### API Layer
* `API Client`: Axios-based HTTP client for backend communication.
* `AI Service`: Integration service for Gemini API interactions.

---

### Security Implementation

#### Backend Security
* **Environment Variable Management**: All sensitive credentials are stored in `.env` files.
* **No Hardcoded Secrets**: AWS credentials and API keys are properly externalized.
* **Safe JSON Access**: Proper error handling for malformed JSON data.

#### Frontend Security
* **Environment Configuration**: API URLs are configured through environment variables.
* **Input Validation**: User input sanitization and validation.
* **Error Boundary**: Graceful error handling for UI components.


## API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/quarterly-revenue` | `GET` | Quarterly revenue and QoQ growth data |
| `/api/v1/revenue-bridge` | `GET` | Revenue bridge and churn analysis |
| `/api/v1/country-revenue` | `GET` | Country-wise revenue breakdown |
| `/api/v1/region-revenue` | `GET` | Region-wise revenue analysis |
| `/api/v1/customer-concentration`| `GET` | Customer concentration metrics |
| `/api/v1/ask-ai` | `POST` | AI-powered data analysis queries |

---

## Development Guidelines

### Code Quality Standards
* **Modular Design**: Clear separation between controllers, services, and configuration.
* **DRY Principle**: Reusable components and utility functions throughout the codebase.
* **Comprehensive Comments**: Detailed JavaDoc and inline comments for complex logic.
* **Consistent Naming**: RESTful conventions and descriptive variable names.

### State Management
* **React Query**: Efficient data fetching and caching for API interactions.
* **React Hooks**: Proper state management with `useState` and `useMemo`.
* **Component Composition**: Modular React components with clear props interfaces.

---

## Technologies Used
* **Backend**: Spring Boot 3.2.6, Spring WebFlux, AWS SDK, Swagger/OpenAPI
* **Frontend**: React 19.1.1, Ant Design 5.26.7, Recharts 3.1.0, React Query 5.84.1
* **Build Tools**: Maven (Backend), Create React App (Frontend)
* **Cloud Services**: AWS S3, Google Gemini API
