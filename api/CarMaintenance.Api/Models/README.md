
# Model Hierarchy

> This file contains details on how the models (User, Car, and MaintenanceItem) relate to each other.

## User: 

#### Objects of type `user` contain the following data members:

> `Id` `Name` `Email` `Password` `CreatedOn` `ModifiedOn`

#### Additionally, `user` objects contain the following navigational identifier:

> Type: `IEnumerable<Car>` Name: `Cars`

## Car:

#### Objects of type `car` contain the following data members:

> `Id` `Nickname` `Year` `Make` `Model` `Trim` `Engine`
> `Transmission` `CreatedOn` `ModifiedOn`

#### Additionally, `car` objects contain the following navigational identifiers:

> Type:`IEnumerable<MaintenanceItem>` Name: `MaintenanceItems` 
  Type:`User` Name: `User` |
  Type: `Guid` Name: `UserId`

## MaintenanceItem

#### Objects of type `MaintenanceItem` contain the following data members:

> `Id`
  `Description`
  `Date`
  `Cost`
  `CreatedOn`
  `ModifiedOn`

#### Additionally, `MaintenanceItem` objects contain the following navigational identifiers:

> Type: `Car` Name: `Car` 
> | Type: `Guid` Name: `CarId`