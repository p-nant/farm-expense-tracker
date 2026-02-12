# Farm Management System – Technical Documentation

## PROJECT OVERVIEW

### Owner
Philippa Nantamu

### Project Title
- **Project Name:** Farm Management System(FMS)
- **Project Version:** 1.0.0  
- **Project Status:** Development  
- **Start Date:** 19th Jan 2026  
- **Maintained By:** Philippa Nantamu & AI Development Team

### Project Description
The Farm Management System (FMS) is a web application designed to digitize farm expense tracking and evolve into a structured crop-level cost and profitability management system.

## PROBLEM STATEMENT
Small and medium-sized farms often lack structured systems to track operational costs by crop, plot or animals. 
Operational expenses are frequently recorded in notebooks or spreadsheets without linking them to specific farm activities, crops or plots making it difficult to:

- Understand true cost per crop or animal
- Utilise automation systems that would limit data inconsistencies and drive efficiency on farms
- Measure profitability through optimising earnings per acre or effort
- Identify high-cost seasons and segments
- Support data-driven decision making for future seasons

As a result, there is a need for a structured, extensible system that captures operational data to supports financial and operational decision-making.

## PURPOSE
To design and implement a modular farm management system that;

- Records operational expenses in a structured format
- Links expenses to crops and plots 
- Provide financial visibility via dashboards
- Enables future crop-level profitability analytics 
- Supports scalable database architecture

## OBJECTIVES 
- Implement structured expense tracking with validation
- Introduce crop and plot registries
- Enable expense to crop linkages
- Provide dashboard summaries and time-based comparisons
- Support cost-per-crop analytics
- Design database structure for scalable expansion
- Ensure safe incremental schema evolution

## STAKEHOLDERS 
### Stakeholders 
- Farm owners/Investors
- Farm manager
- Admin
- Data Entry Staff
- Accountants/Auditors

### User Roles 
#### Admin
- Full CRUD
- Data correction
- System configuration

#### Farm Manager 
- View dashboards
- Review crop and cost performance

#### Data Entry
- Record expenses
- Register crops and plots
- No strategic access 

## SYSTEM SCOPE 
### Current Scope (Implemented)
- Expense CRUD (Create, Read, Update, Delete)
- Dashboard:
    - Total expenses
    - Remitances vs expenses
    - Business unit breakdown
    - Project drill-down
    - Quarterly summaries 
- CSV import (flexible headers + date parsing) 

### Phase 2 Scope (In Development)
- Crop registry
- Plot/location registry 
- Linking expenses to crops
- Crop level expense reporting

### Phase 3 Scope (Planned)
- Harvest tracking (expected vs actual)
- Revenue recording
- Profitability analytics
- Decision support alerts 

## SYSTEM ARCHITECTURE 
### Logical Architecture

Presentation Layer 
-> HTML/CSS/JS frontend

Application Layer
-> FastAPI REST API

Data Layer
-> SQLite (development)
-> PostgreSQL (production)

Analytics Layer 
-> Aggregation logic via API queries and frontend computation

### Data Flow 
Browser 
-> HTTP Request
-> FastAPI 
-> Database 
-> JSON Response 
-> Dashboard Rendering 

## DATA MODELS 
**Current Entities**

Expense
| Field         | Type    | Notes       |
| ------------- | ------- | ----------- |
| id            | Integer | Primary Key |
| date          | Date    | Required    |
| person        | String  | Required    |
| description   | String  | Required    |
| amount        | Decimal | > 0         |
| business_unit | String  | Required    |
| project       | String  | Optional    |


**Phase 2 Entities**

Crop
| Field                 | Type    | Notes         |
| --------------------- | ------- | ------------- |
| id                    | Integer | Primary Key   |
| crop_type             | String  | Required      |
| variety               | String  | Optional      |
| planting_date         | Date    | Required      |
| expected_harvest_date | Date    | Optional      |
| growth_stage          | String  | Optional      |
| plot_id               | FK      | Links to Plot |

Plot
| Field | Type    | Notes       |
| ----- | ------- | ----------- |
| id    | Integer | Primary Key |
| name  | String  | Unique      |
| size  | Decimal | Optional    |

**CropExpense Relationship** 

Initially: A one-to-many
Expense → crop_id (Foreign Key)

Rationale:
- Simplifies schema
- Faster to implement
- Supports primary use case

Future: 
A many-to-many using the CropExpense link table once shared costs become frequent

## API SPECIFICATIONS
**Current Endpoints**
- `GET /api/expenses`
- `POST /api/expenses`
- `GET /api/expenses/{id}`
- `PUT /api/expenses/{id}`
- `DELETE /api/expenses/{id}`

**Phase 2 Endpoints**
- `GET /api/crops`
- `POST /api/crops`
- `PUT /api/crops/{id}`
- `DELETE /api/crops/{id}`
- `GET /api/plots`
- `POST /api/plots`

Expense update:

Expense payload will include crop_id `POST /api/crops/{id}/expenses` (link)

## UI STRUCTURE
**Current Pages**
- Entry page
  - Expense form
  - Expense table
- Dashboard
  - Financial summaries
  - Charts
  - Quarter filter

**Phase 2 Additions**
- Crop Registry Page
- Plot Management Page
- Crop selection dropdown in expense form

## ANALYTICS AND REPORTING
**Current Reporting**
Status: Operational reporting only
- Total expenses
- Remittances vs expenses
- Business unit breakdown
- Quarterly comparisons

**Phase 2 Reporting**
- Total Cost per crop = total linked expenses by crop.
- Crop cost comparison; Profitability = crop value (yield × price) − crop cost
- Plot-level spending

**Phase 3 Reporting**
## 10) Data Validation Rules
**Current**
- Required: date, person, description, amount > 0.
- Optional: project.

**Planned**
- Crop lifecycle dates must be logical (planting ≤ harvest).
- Plot name unique.

## 11) Reporting & Metrics
**Current**
- Totals (remittances vs expenses).
- Business unit and project breakdown.
- Quarterly summaries.

**Planned**
- Crop profitability reports.
- Plot utilization.

## 12) Non‑Functional Requirements
- Local development on macOS.
- Data integrity (avoid schema mismatch).
- Safe incremental schema changes.

## 13) Risks & Constraints
- CSV imports can contain inconsistent dates and headers.
- Manual data entry errors.

## 14) Roadmap
**Phase 1**
- Add crop/plot tables and endpoints.
- Add crop selection to expense entry.

**Phase 2**
- Crop registry UI and linking UI.
- Reporting by crop.

**Phase 3**
- Decision support dashboards and alerts.

## 15) Change Log
- 2026-01-28: Added CSV import fixes (path handling and date parsing), dashboard JS modularized, expense form toggle UI, and schema migration helper.
