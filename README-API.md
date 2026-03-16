# 📚 Documentación API - SIATA Logistics

## 🚚 Bienvenido a la Documentación Oficial

Esta es la documentación completa y detallada de la API REST del **Sistema Integral de Administración y Transporte de Almacenes (SIATA Logistics)**. Aquí encontrarás toda la información necesaria para integrar, consumir y entender nuestros servicios web.

---

## 📋 Tabla de Contenidos

- [🚀 Inicio Rápido](#-inicio-rápido)
- [🌐 Visión General](#-visión-general)
- [🔧 Configuración](#-configuración)
- [📚 Módulos de la API](#-módulos-de-la-api)
- [🔐 Autenticación](#-autenticación)
- [📝 Formatos de Respuesta](#-formatos-de-respuesta)
- [⚠️ Códigos de Error](#️-códigos-de-error)
- [🛠️ Herramientas Recomendadas](#️-herramientas-recomendadas)
- [📞 Soporte](#-soporte)

---

## 🚀 Inicio Rápido

### 1. 📄 Requisitos Previos

- Node.js 16+ (para desarrollo local)
- Cliente HTTP (Postman, Insomnia, curl, etc.)
- Conexión a internet

### 2. 🌡️ URL Base de la API

```
Entorno Desarrollo: http://localhost:3000
Entorno Producción: https://api.siata-logistics.com
```

### 3. 🧪 Primer Test - Obtener Clientes

```bash
curl -X GET "http://localhost:3000/clients" \
     -H "Content-Type: application/json"
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "name": "María González",
    "email": "maria@empresa.com",
    "phone": "+57 300 123 4567"
  }
]
```

### 4. 🎯 Crear tu Primer Cliente

```bash
curl -X POST "http://localhost:3000/clients" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Juan Pérez",
       "email": "juan@ejemplo.com",
       "phone": "+57 315 234 5678"
     }'
```

---

## 🌐 Visión General

### 🏗️ Arquitectura del Sistema

SIATA Logistics es una plataforma completa de gestión logística que incluye:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   👥 Clientes   │    │   📦 Productos  │    │   🏭 Bodegas    │
│                 │    │                 │    │                 │
│ • Gestión CRUD  │    │ • Catálogo      │    │ • Almacenamiento│
│ • Contacto      │    │ • Inventario    │    │ • Ubicaciones   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   🚚 Envíos     │
                    │                 │
                    │ • Terrestres    │
                    │ • Marítimos     │
                    │ • Tracking      │
                    │ • Costos        │
                    └─────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ⚓ Puertos     │    │   💰 Costos     │    │   📊 Reportes   │
│                 │    │                 │    │                 │
│ • Terminales    │    │ • Descuentos    │    │ • Estadísticas  │
│ • Internacional │    │ • Cálculos     │    │ • Análisis      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🔗 Flujo de Trabajo Típico

1. **👥 Registro de Clientes**: Agregar nuevos clientes al sistema
2. **📦 Gestión de Productos**: Mantener catálogo actualizado
3. **🏭 Configuración de Almacenes**: Definir bodegas y puertos
4. **🚚 Creación de Envíos**: Generar envíos terrestres/marítimos
5. **📊 Seguimiento**: Monitorizar estado y progreso
6. **💰 Facturación**: Cálculo automático de costos

---

## 🔧 Configuración

### 📋 Headers Requeridos

Todas las solicitudes deben incluir los siguientes headers:

```http
Content-Type: application/json
Accept: application/json
```

### 🔐 Autenticación (Futura)

Aunque actualmente la API no requiere autenticación, en futuras versiones se implementará:

```http
Authorization: Bearer <token_jwt>
```

### 🌍 Configuración Regional

```http
Accept-Language: es-CO
Timezone: America/Bogota
```

---

## 📚 Módulos de la API

### 👥 Clientes (`/clients`)

Gestión completa de clientes del sistema logístico.

#### 🔗 Endpoints Disponibles:

| Método | Endpoint | Descripción | Emoji |
|--------|-----------|-------------|--------|
| GET | `/clients` | Obtener todos los clientes | 📋 |
| POST | `/clients` | Crear nuevo cliente | ➕ |
| GET | `/clients/{id}` | Obtener cliente por ID | 🔍 |
| PUT | `/clients/{id}` | Actualizar cliente existente | ✏️ |
| DELETE | `/clients/{id}` | Eliminar cliente | 🗑️ |

#### 📝 Campos del Cliente:

```typescript
interface Client {
  id: number;           // 🆔 ID único (autogenerado)
  name: string;         // 👤 Nombre completo (requerido)
  email: string;        // 📧 Email único (requerido)
  phone: string;        // 📱 Teléfono (opcional)
}
```

#### 💡 Ejemplos de Uso:

```javascript
// Obtener todos los clientes
const clients = await fetch('http://localhost:3000/clients');

// Crear nuevo cliente
const newClient = await fetch('http://localhost:3000/clients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Ana Martínez",
    email: "ana@nuevaempresa.com",
    phone: "+57 315 234 5678"
  })
});
```

---

### 📦 Productos (`/products`)

Administración del catálogo de productos e inventario.

#### 🔗 Endpoints Disponibles:

| Método | Endpoint | Descripción | Emoji |
|--------|-----------|-------------|--------|
| GET | `/products` | Obtener todos los productos | 📋 |
| POST | `/products` | Crear nuevo producto | ➕ |
| GET | `/products/{id}` | Obtener producto por ID | 🔍 |
| PUT | `/products/{id}` | Actualizar producto existente | ✏️ |
| DELETE | `/products/{id}` | Eliminar producto | 🗑️ |

#### 📝 Campos del Producto:

```typescript
interface Product {
  id: number;           // 🆔 ID único (autogenerado)
  name: string;         // 📝 Nombre único (requerido)
  description: string;  // 📄 Descripción detallada (requerido)
}
```

#### 💡 Ejemplos de Uso:

```javascript
// Crear nuevo producto
const newProduct = await fetch('http://localhost:3000/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Smartphone Samsung Galaxy S24",
    description: "Teléfono flagship con cámara de 50MP, 256GB almacenamiento, 5G"
  })
});
```

---

### 🏭 Bodegas (`/warehouses`)

Gestión de almacenes y centros de distribución.

#### 🔗 Endpoints Disponibles:

| Método | Endpoint | Descripción | Emoji |
|--------|-----------|-------------|--------|
| GET | `/warehouses` | Obtener todas las bodegas | 📋 |
| POST | `/warehouses` | Crear nueva bodega | ➕ |
| GET | `/warehouses/{id}` | Obtener bodega por ID | 🔍 |
| PUT | `/warehouses/{id}` | Actualizar bodega existente | ✏️ |
| DELETE | `/warehouses/{id}` | Eliminar bodega | 🗑️ |

#### 📝 Campos de la Bodega:

```typescript
interface Warehouse {
  id: number;           // 🆔 ID único (autogenerado)
  name: string;         // 📝 Nombre único (requerido)
  location: string;     // 📍 Dirección completa (requerido)
  country: string;      // 🌍 País (requerido)
}
```

#### 💡 Ejemplos de Uso:

```javascript
// Crear nueva bodega
const newWarehouse = await fetch('http://localhost:3000/warehouses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Micro Centro Bogotá Norte",
    location: "Calle 170 # 58-75, Bogotá",
    country: "Colombia"
  })
});
```

---

### ⚓ Puertos (`/ports`)

Administración de puertos marítimos para envíos internacionales.

#### 🔗 Endpoints Disponibles:

| Método | Endpoint | Descripción | Emoji |
|--------|-----------|-------------|--------|
| GET | `/ports` | Obtener todos los puertos | 📋 |
| POST | `/ports` | Crear nuevo puerto | ➕ |
| GET | `/ports/{id}` | Obtener puerto por ID | 🔍 |
| PUT | `/ports/{id}` | Actualizar puerto existente | ✏️ |
| DELETE | `/ports/{id}` | Eliminar puerto | 🗑️ |

#### 📝 Campos del Puerto:

```typescript
interface Port {
  id: number;           // 🆔 ID único (autogenerado)
  name: string;         // 📝 Nombre único (requerido)
  city: string;         // 🏙️ Ciudad (requerido)
  country: string;      // 🌍 País (requerido)
}
```

#### 💡 Ejemplos de Uso:

```javascript
// Crear nuevo puerto
const newPort = await fetch('http://localhost:3000/ports', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Terminal Marítimo Santa Marta",
    city: "Santa Marta",
    country: "Colombia"
  })
});
```

---

### 🚚 Envíos (`/shipments`)

Sistema completo de envíos terrestres y marítimos.

#### 🔗 Endpoints Disponibles:

| Método | Endpoint | Descripción | Emoji |
|--------|-----------|-------------|--------|
| GET | `/shipments` | Obtener todos los envíos | 📋 |
| POST | `/shipments/land` | Crear envío terrestre | 🚛 |
| POST | `/shipments/sea` | Crear envío marítimo | 🚢 |

#### 📝 Campos del Envío:

```typescript
interface Shipment {
  id: number;                    // 🆔 ID único (autogenerado)
  tracking_number: string;        // 📦 Número de seguimiento
  shipment_type: "LAND" | "SEA"; // 🚛🚢 Tipo de envío
  quantity: number;               // 📊 Cantidad
  price: number;                  // 💰 Precio unitario
  discount: number;               // 🎁 Descuento (autocalculado)
  total_price: number;            // 💵 Total final
  register_date: string;          // 📅 Fecha de registro
  delivery_date: string;          // 📆 Fecha de entrega
  client: string;                 // 👤 Nombre cliente
  product: string;                // 📦 Nombre producto
  vehicle_plate?: string;         // 🚗 Placa (terrestre)
  warehouse?: string;             // 🏭 Bodega (terrestre)
  fleet_number?: string;          // 🚢 Flota (marítimo)
  port?: string;                  // ⚓ Puerto (marítimo)
}
```

#### 💡 Ejemplos de Uso:

```javascript
// Crear envío terrestre
const landShipment = await fetch('http://localhost:3000/shipments/land', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: 1,
    product_id: 1,
    quantity: 5,
    price: 150.00,
    warehouse_id: 1,
    vehicle_plate: "ABC123",
    delivery_date: "2024-02-01"
  })
});

// Crear envío marítimo
const seaShipment = await fetch('http://localhost:3000/shipments/sea', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: 1,
    product_id: 1,
    quantity: 200,
    price: 150.00,
    port_id: 1,
    fleet_number: "CONTAINER2024A",
    delivery_date: "2024-03-15"
  })
});
```

---

## 🔐 Autenticación

### 🚫 Estado Actual

**Actualmente la API no requiere autenticación** para facilitar el desarrollo y pruebas.

### 🔮 Futura Implementación

En próximas versiones se implementará:

```http
Authorization: Bearer <token_jwt>
```

#### 📝 Flujo de Autenticación Futuro:

1. **🔑 Login**: Obtener token JWT
2. **🎫 Token**: Incluir token en cada solicitud
3. **⏰ Refresh**: Renovar token automáticamente
4. **🚫 Logout**: Invalidar token al cerrar sesión

---

## 📝 Formatos de Respuesta

### ✅ Respuestas Exitosas

```json
{
  "data": {
    // Datos solicitados
  },
  "message": "Operación exitosa",
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### ❌ Respuestas de Error

```json
{
  "error": {
    "message": "Descripción del error",
    "code": "ERROR_CODE",
    "details": {
      "field": "campo_afectado",
      "value": "valor_problemático"
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

---

## ⚠️ Códigos de Error

| Código | Descripción | Emoji | Solución |
|--------|-------------|--------|----------|
| 200 | ✅ Éxito | ✅ | Operación completada |
| 201 | 🎉 Creado | ✅ | Recurso creado exitosamente |
| 400 | ❌ Solicitud Inválida | ❌ | Verificar datos enviados |
| 404 | 🔍 No Encontrado | ❌ | Recurso no existe |
| 500 | 💥 Error Interno | ❌ | Contactar soporte |

### 📋 Códigos de Error Específicos:

- `EMAIL_ALREADY_EXISTS`: El email ya está registrado
- `CLIENT_NOT_FOUND`: Cliente no encontrado
- `PRODUCT_NOT_FOUND`: Producto no encontrado
- `WAREHOUSE_NOT_FOUND`: Bodega no encontrada
- `PORT_NOT_FOUND`: Puerto no encontrado
- `INVALID_SHIPMENT_TYPE`: Tipo de envío inválido
- `INSUFFICIENT_STOCK`: Stock insuficiente

---

## 🛠️ Herramientas Recomendadas

### 🌐 Interfaces Web

| Herramienta | Descripción | Enlace |
|-------------|-------------|--------|
| 🦎 Postman | Cliente API completo | https://www.postman.com |
| 🔧 Insomnia | Cliente API elegante | https://insomnia.rest |
| 🌐 Swagger UI | Documentación interactiva | https://swagger.io/tools/swagger-ui/ |

### 💻 Librerías por Lenguaje

#### JavaScript/Node.js
```bash
npm install axios
# o
npm install fetch
```

#### Python
```bash
pip install requests
```

#### Java
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

#### PHP
```bash
composer require guzzlehttp/guzzle
```

---

## 📊 Ejemplos Prácticos

### 🎯 Escenario Completo: Proceso de Envío

```javascript
// 1. Obtener lista de clientes
const clients = await fetch('/clients');
const clientList = await clients.json();

// 2. Obtener productos disponibles
const products = await fetch('/products');
const productList = await products.json();

// 3. Obtener bodegas para envío terrestre
const warehouses = await fetch('/warehouses');
const warehouseList = await warehouses.json();

// 4. Crear envío terrestre
const shipment = await fetch('/shipments/land', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: clientList[0].id,      // Primer cliente
    product_id: productList[0].id,     // Primer producto
    quantity: 10,
    price: 150.00,
    warehouse_id: warehouseList[0].id, // Primera bodega
    vehicle_plate: "ABC123",
    delivery_date: "2024-02-01"
  })
});

const result = await shipment.json();
console.log(`Envío creado: ${result.tracking_number}`);
```

### 📈 Reporte de Envíos por Cliente

```javascript
// Obtener todos los envíos
const shipments = await fetch('/shipments');
const shipmentList = await shipments.json();

// Agrupar por cliente
const shipmentsByClient = shipmentList.reduce((acc, shipment) => {
  if (!acc[shipment.client]) {
    acc[shipment.client] = [];
  }
  acc[shipment.client].push(shipment);
  return acc;
}, {});

// Mostrar resumen
Object.entries(shipmentsByClient).forEach(([client, clientShipments]) => {
  const totalValue = clientShipments.reduce((sum, s) => sum + s.total_price, 0);
  console.log(`👤 ${client}: ${clientShipments.length} envíos, $${totalValue.toFixed(2)}`);
});
```

---

## 📞 Soporte

### 🆘 Canales de Ayuda

| Canal | Descripción | Contacto |
|-------|-------------|----------|
| 📧 Email | Soporte técnico | support@siata-logistics.com |
| 💬 Discord | Comunidad desarrolladores | https://discord.gg/siata |
| 📖 Documentación | Guías detalladas | https://docs.siata-logistics.com |
| 🐛 Issues | Reportar problemas | https://github.com/siata-logistics/issues |

### 🎯 Mejores Prácticas

1. **🔄 Reintentos**: Implementar lógica de reintentos con backoff exponencial
2. **📝 Logging**: Registrar todas las solicitudes y respuestas
3. **⚡ Cache**: Cachear datos que no cambian frecuentemente
4. **🔍 Validación**: Validar datos antes de enviarlos
5. **📊 Monitoreo**: Monitorear rendimiento y errores

### 🚀 Proximas Características

- 🔐 Autenticación JWT completa
- 📊 Sistema de reportes avanzado
- 🔄 Webhooks para notificaciones
- 📱 SDK para móviles
- 🌍 Soporte multi-idioma

---

## 📄 Licencia

Esta documentación y la API están bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

---

## 🎉 ¡Gracias!

Gracias por usar SIATA Logistics API! Estamos comprometidos con proporcionar la mejor experiencia posible para tus necesidades logísticas.

**¡Happy Coding! 🚀**

---

*Última actualización: Enero 2024*
*Versión: 1.0.0*
