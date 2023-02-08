# Pets API

Deliverable - Build a single resource api  using the express-auth-boilerplate

## MVP
- have one model with at least three properties
- models properties must use more than one data type(String, Number, Boolean, Date etc.)
- have a controller allowing for full CRUD functionality.
  - This includes the following routes
  - index route to view all instances of the resource
  - show route to view one single instance of the resource
  - post route to create an instance of the resource
  - patch route to update one instance of the resource
  - delete route to destroy one instance of the resource
- You must send the response as JSON(this will come into play later) as well as with an appropriate status code

Timm's branch
https://github.com/sei-ec-remote/fruitcakes-pets-api

## Resources

### Pets

### Users

##### Routes Table

## Pets

need to grab the route tables from Timm

| Verb   | URI Patten    |  Controller#Action |
|--------| --------------|--------------------|
| GET    | `/pets`       | `pets#index`       |
| GET    | `/pets/:id`   | `pets#show`        |
| POST   | `/pets`       | `pets#create`      |
| PATCH  | `/change-password/` | `

## Toy

| Verb   | URI Patten    |  Controller#Action |
|--------| --------------|--------------------|
| GET    | `/toys`       | `toys#index`       |
| GET    | `/toys/:petId`   | `toys#show`        |
| POST   | `/toys/:petId/:toyId`       | `toys#create`      |
| PATCH  | `/toys/:` | `