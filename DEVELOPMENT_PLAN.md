# DEVELOPMENT PLAN: Perfilamiento_OTIC_CCHC_v1

## 1. ARCHITECTURE OVERVIEW
**Backend (NestJS):**
- REST API with controllers, services, repositories
- PostgreSQL database with TypeORM
- Keycloak integration for authentication/authorization
- Azure API Management integration
- Modular structure: auth, users, profiles, skills modules

**Frontend (React + Single SPA):**
- Micro-frontend architecture with Single SPA
- React components for UI
- Keycloak client integration
- Profile management interface
- Skill assessment modules

**Infrastructure:**
- Docker containers for all services
- PostgreSQL database container
- PM2 for process management
- Azure deployment configuration

**File Structure:**
```
backend/
  src/
    modules/
      auth/
      users/
      profiles/
      skills/
    shared/
    app.module.ts
    main.ts
  test/
  package.json
  Dockerfile
  .env.example

frontend/
  src/
    components/
    pages/
    services/
    root-config.js (Single SPA)
  package.json
  Dockerfile

scripts/
  create-files.py (Python for scaffolding)

docker-compose.yml
run.sh
run.bat
README.md
```

## 2. MVP ACCEPTANCE CRITERIA
1. User can authenticate via Keycloak and access protected endpoints
2. Admin can create, read, update, and delete user profiles with skills data
3. System stores and retrieves profile data from PostgreSQL database
4. Frontend displays user profiles and allows basic CRUD operations
5. Complete system runs with `docker compose up` command

## 3. EXECUTABLE ITEMS

### ITEM 1: Backend Foundation
**Goal:** Create NestJS backend with core modules and PostgreSQL setup
**Files to create/modify:**
- backend/package.json (create) - Node.js dependencies
- backend/tsconfig.json (create) - TypeScript configuration
- backend/nest-cli.json (create) - NestJS CLI configuration
- backend/src/main.ts (create) - Application entry point
- backend/src/app.module.ts (create) - Root module
- backend/src/shared/database/database.module.ts (create) - Database configuration
- backend/.env.example (create) - Environment variables template
**Dependencies:** None
**Validation:** `npm run start:dev` starts backend without errors

### ITEM 2: Authentication Module
**Goal:** Implement Keycloak authentication and user management
**Files to create/modify:**
- backend/src/modules/auth/auth.module.ts (create) - Auth module
- backend/src/modules/auth/auth.controller.ts (create) - Auth endpoints
- backend/src/modules/auth/auth.service.ts (create) - Auth business logic
- backend/src/modules/auth/guards/keycloak.guard.ts (create) - Keycloak guard
- backend/src/modules/auth/strategies/keycloak.strategy.ts (create) - Keycloak strategy
- backend/src/modules/users/users.module.ts (create) - Users module
- backend/src/modules/users/users.entity.ts (create) - User entity
- backend/src/modules/users/users.service.ts (create) - User service
**Dependencies:** Item 1
**Validation:** Protected endpoints require valid Keycloak token

### ITEM 3: Profile Management Module
**Goal:** Implement profile CRUD operations with skills
**Files to create/modify:**
- backend/src/modules/profiles/profiles.module.ts (create) - Profiles module
- backend/src/modules/profiles/profiles.controller.ts (create) - Profile endpoints
- backend/src/modules/profiles/profiles.service.ts (create) - Profile service
- backend/src/modules/profiles/profiles.entity.ts (create) - Profile entity
- backend/src/modules/skills/skills.module.ts (create) - Skills module
- backend/src/modules/skills/skills.entity.ts (create) - Skill entity
- backend/src/modules/skills/skills.service.ts (create) - Skill service
**Dependencies:** Items 1-2
**Validation:** API endpoints for profiles and skills work with PostgreSQL

### ITEM 4: Frontend Foundation
**Goal:** Create React frontend with Single SPA configuration
**Files to create/modify:**
- frontend/package.json (create) - React dependencies
- frontend/webpack.config.js (create) - Webpack configuration
- frontend/src/root-config.js (create) - Single SPA root config
- frontend/src/PerfilamientoOTIC.js (create) - Main React app
- frontend/src/components/Layout.js (create) - Main layout component
- frontend/src/services/api.js (create) - API service layer
- frontend/src/services/auth.js (create) - Auth service with Keycloak
**Dependencies:** Items 1-3
**Validation:** Frontend builds without errors and loads in browser

### ITEM 5: Profile UI Components
**Goal:** Implement React components for profile management
**Files to create/modify:**
- frontend/src/pages/Login.js (create) - Login page
- frontend/src/pages/Dashboard.js (create) - Main dashboard
- frontend/src/pages/ProfileList.js (create) - Profile listing
- frontend/src/pages/ProfileForm.js (create) - Profile creation/editing
- frontend/src/components/ProfileCard.js (create) - Profile card component
- frontend/src/components/SkillSelector.js (create) - Skill selection component
- frontend/src/components/Navbar.js (create) - Navigation component
**Dependencies:** Items 1-4
**Validation:** UI displays profiles, allows CRUD operations, integrates with backend

### ITEM 6: Testing Suite
**Goal:** Create unit and integration tests
**Files to create/modify:**
- backend/test/auth.e2e-spec.ts (create) - Auth integration tests
- backend/test/profiles.e2e-spec.ts (create) - Profile integration tests
- backend/src/modules/profiles/profiles.service.spec.ts (create) - Profile service tests
- backend/src/modules/auth/auth.service.spec.ts (create) - Auth service tests
- frontend/src/components/ProfileCard.test.js (create) - React component test
- frontend/src/services/api.test.js (create) - API service test
- jest.config.js (create) - Jest configuration
**Dependencies:** Items 1-5
**Validation:** All tests pass with `npm test`

### ITEM 7: Infrastructure
**Goal:** Create Docker configuration and deployment scripts
**Files to create/modify:**
- Dockerfile (create) - Backend Dockerfile
- frontend/Dockerfile (create) - Frontend Dockerfile
- docker-compose.yml (create) - Multi-container setup with PostgreSQL
- run.sh (create) - Linux/Mac startup script
- run.bat (create) - Windows startup script
- README.md (create) - Project documentation
- scripts/create-files.py (create) - Python scaffolding script
- ecosystem.config.js (create) - PM2 configuration
**Dependencies:** All previous
**Validation:** `docker compose up` starts all services, system is accessible