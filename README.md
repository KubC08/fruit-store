
# Fruit Store

A simple fruit store backend with an integrated REST API. **This code is done as a project for a job.**


## Prerequisites

The project requires the following prerequisites to work:
- MongoDB 4.4.6 or higher
- NodeJS 16.13.1 or higher
- Nest CLI 8.2.2 or higher
## Run Locally

Firstly clone the repository.

Go to the fruit-store directory

```bash
  cd fruit-store
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

**The default port is 3000**
## Configuration

A simple explanation of the configuration system located in the config/default.ts file of the project directory.

```typescript
export default () => ({
    // The default admin user created when the app is first ran
    // you can reset the admin info back to default by deleting the admin
    // account out of the database.
    defaultUser: {
        username: 'admin', // This is the username of the admin account
        password: 'admin' // This is the password of the admin account
    },
    // The MongoDB database to use for data storage.
    database: {
        host: 'mongodb://localhost:27017/', // The URI to the MongoDB server
        database: 'fruit-store' // The database name to use for all data storage
    },
    // This is the secret token that JWT will use to sign JWT tokens,
    // make sure to change this from the default!
    jwtSecret: 'ITC2JDIvehqyOYj1yHnamnWKihoVAxqR'
});
```
## API Reference

### Authorization

Logging into the backend returns an access_token. This token should be passed within the Authorization header like so:
```http
Bearer TOKEN
```

#### Login

```http
  POST /auth/login
```

| Parameter  | Type     | Description                     |
| :--------  | :------- | :------------------------------ |
| `username` | `string` | **Required**. Username of user  |
| `password` | `string` | **Required**. Password of user  |

#### Register

```http
  POST /auth/register
```

| Parameter  | Type     | Description                     |
| :--------  | :------- | :------------------------------ |
| `username` | `string` | **Required**. Username of user  |
| `email`    | `string` | **Required**. Email of the user |
| `password` | `string` | **Required**. Password of user  |

### Users

#### Create user
This requires the user to be logged in and an admin!

```http
  POST /users
```

| Parameter  | Type     | Description                                             |
| :--------  | :------- | :------------------------------------------------------ |
| `username` | `string` | **Required**. Username of user                          |
| `email`    | `string` | **Required**. Email of the user                         |
| `password` | `string` | **Required**. Password of user                          |
| `roles`    | `string` | **Required**. The roles to give the user (admin, user)  |

#### Get current user
This requires the user to be logged in!

```http
  GET /users/me
```

#### Get user by id
This requires the user to be logged in and an admin!

```http
  GET /users/${id}
```

| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------- |
| `id`       | `string` | **Required**. The ID of the user |

#### Get users by filter
This requires the user to be logged in and an admin!

```http
  GET /users
```

| Parameter       | Type       | Description                                             |
| :-------------  | :--------- | :------------------------------------------------------ |
| `username`      | `string`   | Username of user                                        |
| `roles`         | `string[]` | The roles to filter by (admin, user)                    |
| `page`          | `number`   | The page of users to get (default: 1)                   |
| `itemsPerPage`  | `number`   | The number of users per page (default: 10)              |

#### Patch a specific user
This requires the user to be logged in and an admin!

```http
  PATCH /users/${id}
```

Query parameters:
| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------- |
| `id`       | `string` | **Required**. The ID of the user |

Body parameters:
| Parameter  | Type     | Description                               |
| :--------  | :------- | :---------------------------------------- |
| `username` | `string` | Username of user                          |
| `email`    | `string` | Email of the user                         |
| `password` | `string` | Password of user                          |
| `roles`    | `string` | The roles to give the user (admin, user)  |

#### Remove a specific user
This requires the user to be logged in and an admin!

```http
  DELETE /users/${id}
```

| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------- |
| `id`       | `string` | **Required**. The ID of the user |

### Items

#### Create/Add a new item
This requires the user to be logged in and an admin!

```http
  POST /items
```

| Parameter         | Type       | Description                                        |
| :---------------  | :--------- | :------------------------------------------------- |
| `name`            | `string`   | **Required**. The name of the item                 |
| `description`     | `string`   | **Required**. The description of the item          |
| `availableCount`  | `number`   | **Required**. The available quantity of this item  |
| `tags`            | `string[]` | **Required**. The tags for the item                |

#### Get item by id

```http
  GET /items/${id}
```

| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------- |
| `id`       | `string` | **Required**. The ID of the item |

#### Get items by filter

```http
  GET /items
```

| Parameter       | Type        | Description                                               |
| :-------------  | :---------- | :-------------------------------------------------------- |
| `available`     | `boolean`   | If true display only available items (opposite if false)  |
| `name`          | `string`    | The approximate name of the item to search for            |
| `tags`          | `string[]`  | The tags to filter by                                     |
| `page`          | `number`    | The page of items to get (default: 1)                     |
| `itemsPerPage`  | `number`    | The number of items per page (default: 10)                |

#### Patch a specific item
This requires the user to be logged in and an admin!

```http
  PATCH /items/${id}
```

Query parameters:
| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------- |
| `id`       | `string` | **Required**. The ID of the item |

Body parameters:
| Parameter         | Type       | Description                          |
| :---------------  | :--------- | :----------------------------------- |
| `name`            | `string`   | The name of the item                 |
| `description`     | `string`   | The description of the item          |
| `availableCount`  | `number`   | The available quantity of this item  |
| `tags`            | `string[]` | The tags for the item                |

#### Remove a specific item
This requires the user to be logged in and an admin!

```http
  DELETE /items/${id}
```

| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------- |
| `id`       | `string` | **Required**. The ID of the item |

### Orders

#### Create an order

```http
  POST /orders
```

| Parameter         | Type       | Description                                                             |
| :---------------- | :--------- | :---------------------------------------------------------------------- |
| `items`           | `string[]` | **Required**. The item IDs to add to the order (duplicate for quantity) |
| `shippingType`    | `string`   | **Required**. The shipping type (manual, deliverhome, pickupstop)       |
| `paymentType`     | `string`   | **Required**. The payment type (creditcard, arrival)                    |
| `deliveryAddress` | `string`   | **Required**. The address to deliver to                                 |
| `deliveryCity`    | `string`   | **Required**. The city to deliver to                                    |
| `deliveryCountry` | `string`   | **Required**. The country to deliver to                                 |

#### Get order by id

```http
  GET /orders/${id}
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `id`       | `string` | **Required**. The ID of the order |

#### Get orders by filter
This requires the user to be logged in and an admin!

```http
  GET /orders
```

| Parameter         | Type       | Description                                                       |
| :---------------- | :--------- | :---------------------------------------------------------------- |
| `shippingType`    | `string`   | **Required**. The shipping type (manual, deliverhome, pickupstop) |
| `paymentType`     | `string`   | **Required**. The payment type (creditcard, arrival)              |
| `deliveryCountry` | `string`   | **Required**. The country to deliver to                           |
| `page`            | `number`   | The page of items to get (default: 1)                             |
| `itemsPerPage`    | `number`   | The number of items per page (default: 10)                        |

#### Patch specific order
This requires the user to be logged in and an admin!

```http
  PATCH /orders/${id}
```

Query parameters:
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `id`       | `string` | **Required**. The ID of the order |

Body parameters:
| Parameter         | Type       | Description                                               |
| :---------------- | :--------- | :-------------------------------------------------------- |
| `items`           | `string[]` | The item IDs to add to the order (duplicate for quantity) |
| `shippingType`    | `string`   | The shipping type (manual, deliverhome, pickupstop)       |
| `paymentType`     | `string`   | The payment type (creditcard, arrival)                    |
| `deliveryAddress` | `string`   | The address to deliver to                                 |
| `deliveryCity`    | `string`   | The city to deliver to                                    |
| `deliveryCountry` | `string`   | The country to deliver to                                 |

#### Remove specific order
This requires the user to be logged in and an admin!

```http
  DELETE /orders/${id}
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `id`       | `string` | **Required**. The ID of the order |