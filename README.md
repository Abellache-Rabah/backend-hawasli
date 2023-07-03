# backend-hawasli

## Folder Sturcture :
- In the controllers folder, define your route handlers. These controllers should be kept free of business logic and should only handle requests and responses. They can dispatch data to the services layer.
- In the models folder, define your data models and database schemas if you are using a database. This is where you can define the structure and behavior of your data.
- In the services folder, define the business logic of your application. These services should handle the core functionality of your application and can be reused across different controllers.
- In the routes folder, define the routes for your application. These routes will map to the appropriate controller methods. Each route file can handle a specific set of related routes.
- config folder to store configuration files, such as environment variables or database configurations.
You can also create a utils folder to store utility functions or helper modules that can be used throughout your application.