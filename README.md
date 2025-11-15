# Innova - Sistema de Gestión de Avance

Sistema de administración para gestionar el progreso de usuarios, temas y certificaciones.

## Características

- **Gestión de Usuarios**: Visualiza la lista de usuarios con sus temas y estado de aprendizaje
- **Sistema de Certificaciones**: Administra el proceso de certificación mediante mentorías
- **Filtros y Búsqueda**: Filtra certificaciones por estado y busca por usuario o tema
- **Confirmación de Aprendizaje**: Los administradores pueden confirmar el aprendizaje mediante mentorías

## Estructura del Proyecto

```
src/
├── app/
│   ├── gestion-avance/
│   │   ├── gestion-avance.component.ts
│   │   ├── gestion-avance.component.html
│   │   └── gestion-avance.component.css
│   └── app.component.ts
├── models/
│   └── usuario.model.ts
├── services/
│   └── gestion-avance.service.ts
├── main.ts
├── index.html
└── styles.css
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar el proyecto:
```bash
npm start
```

3. Abrir en el navegador:
```
http://localhost:4200
```

## Componentes

### GestionAvanceComponent

Componente principal que muestra:
- Lista de usuarios con sus temas
- Estado de aprendizaje de cada tema
- Progreso de mentorías
- Lista de certificaciones con filtros
- Modal para confirmar aprendizaje y emitir certificados

### GestionAvanceService

Servicio que maneja:
- Obtener lista de usuarios
- Obtener certificaciones
- Confirmar aprendizaje
- Iniciar mentorías
- Rechazar certificaciones

**Nota**: Actualmente utiliza datos falsos. Los métodos están preparados para consumir endpoints reales cuando el backend esté listo.

## Modelos

### Usuario
- Información del usuario
- Lista de temas con estado de aprendizaje
- Número de certificados obtenidos

### Tema
- Información del tema
- Estado de aprendizaje
- Requisitos de mentoría
- Progreso de mentorías

### Certificacion
- Información de la certificación
- Estado (pendiente, en_mentoria, completada, rechazada)
- Fechas de solicitud y completado
- Observaciones

## Integración con Backend

Para conectar con endpoints reales, edita `gestion-avance.service.ts`:

1. Importa `HttpClient`:
```typescript
import { HttpClient } from '@angular/common/http';
```

2. Inyecta en el constructor:
```typescript
constructor(private http: HttpClient) {}
```

3. Descomenta y configura los métodos que están comentados al final del archivo
4. Configura la URL del API en `apiUrl`

## Desarrollo

Este proyecto utiliza Angular 17 con componentes standalone.

