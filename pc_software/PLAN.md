# Project Control System (AI-Powered) - Detailed Execution Plan

## 1. Strategic Pivot: Why Python? (تغییر استراتژیک)
To achieve the advanced AI goals (OCR for documents, Predictive Analysis, Auto-Scheduling), we are switching the core technology to **Python**.
-   **Old Plan (PHP):** Good for web forms, but cannot do heavy AI processing natively.
-   **New Plan (Python/Django):** "Batteries-included" web framework + Native access to the world's best AI libraries.

## 2. System Architecture (معماری سیستم)
We will use **Django** (Python) as the unified backend. It provides a powerful Admin Interface out-of-the-box and seamless integration with AI libraries.

### Directory Structure
```
PC Software/
├── manage.py          # Django Entry Point
├── core/              # Project Settings
├── apps/
│   ├── projects/      # WBS, Activities, Schedule
│   ├── reports/       # Daily Reports, Site Data
│   ├── ai_engine/     # Brain: OCR, Prediction Models (New!)
│   ├── dms/           # Document Management System
│   └── users/         # Authentication
├── media/             # Uploaded Files (Photos, Scans)
└── templates/         # HTML Interfaces (Mobile & Desktop)
```

## 3. AI Modules Breakdown (ماژول‌های هوش مصنوعی)

### A. Intelligent DMS & OCR (اسکن هوشمند مدارک)
*   **Goal:** Auto-fill forms from scanned PDFs/Images.
*   **Tech:** `pytesseract` (OCR) + `OpenCV` (Image Processing) + `Spacy` (NLP).
*   **Workflow:**
    1.  User uploads a "Delivery Note" or "Invoice" photo.
    2.  System scans text -> Extracts "Date", "Material Name", "Quantity".
    3.  System suggests a filled "Material Entry Form" for user confirmation.

### B. Predictive Project Control (کنترل پروژه پیش‌بینانه)
*   **Goal:** Predict delays before they happen.
*   **Tech:** `Pandas` (Data Analysis) + `Scikit-learn` (Regression Models).
*   **Features:**
    *   **Smart Forecasting:** Instead of simple formulas, use historical data to predict `EAC` (Estimate at Completion).
    *   **Risk Detection:** Analyze text in daily reports (e.g., frequent mentions of "rain" or "breakdown") to flag hidden risks.

### C. Automated Scheduling (زمان‌بندی خودکار)
*   **Goal:** Reduce manual P6/MSP work.
*   **Tech:** `NetworkX` (Graph Theory) for Critical Path Method (CPM) calculation.
*   **Feature:** System auto-calculates Start/Finish dates when actual progress is entered.

## 4. Database Schema (Optimized for Django ORM)

### Core Models
1.  **Project**: `code`, `name`, `budget`, `duration`.
2.  **WBS**: Tree structure of work packages.
3.  **Activity**: The atomic task.
    *   *AI Field:* `predicted_delay_probability` (Float).
4.  **Resource**: Manpower/Machinery.

### Data Models
5.  **DailyReport**: The main input.
    *   *AI Field:* `sentiment_score` (Is the site report positive or alarming?).
6.  **Document**: Uploaded files.
    *   *AI Field:* `ocr_content` (Full text extracted for search).

## 5. Execution Roadmap (نقشه راه جدید)

### Phase 1: The Python Foundation
*   Install Python & Django.
*   Setup the "Admin Panel" (Immediate win: You can start defining Projects/WBS instantly).

### Phase 2: The "Smart" Data Collection
*   Build the Mobile View for site engineers.
*   **AI Feature 1:** Implement OCR for uploading "Material Delivery Notes".

### Phase 3: The Analytical Brain
*   Build the S-Curve and EVM Dashboard.
*   **AI Feature 2:** Add "Prediction Widget" showing likely finish dates based on current trend.

### Phase 4: Full Automation
*   Generate PDF Reports.
*   Export to P6/MSP.

## 6. Immediate Pre-requisites
Since we are on Windows, we need to ensure **Python** is correctly installed and accessible via terminal.
