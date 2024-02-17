## Previews
### API
To see api Docs go to: `https//{your_api_host}/api/docs`. example `https://localhost:3000/api/docs`
![image](https://github.com/luisFelipeEvilla/nestjs-interview/assets/35440641/7cb8b161-f83d-4037-a0ba-2d57f8135826)
![image](https://github.com/luisFelipeEvilla/nestjs-interview/assets/35440641/94be337e-6e91-4a3c-a58d-39f6f5379696)
![image](https://github.com/luisFelipeEvilla/nestjs-interview/assets/35440641/f0de1838-7701-4c3d-813d-3e8de4008f80)

### Frontend
![image](https://github.com/luisFelipeEvilla/nestjs-interview/assets/35440641/df73dfec-8016-4ffe-a832-dd056a5aa23f)
![image](https://github.com/luisFelipeEvilla/nestjs-interview/assets/35440641/18264c4c-b0df-4850-9d5a-024db7b02f6d)


## Technologies

  1. Nestjs
  2. Swagger
  3. TypeScript
  4. Nextjs
  5. TailwindCss
  6. PostgreSQL
  7. PrismaORM
  8. Jest
  9. Nx Mono Repo
  10. 
## Quick Start
Before start, you need to create `.env` file in the project root directory. This fill should look something like this:
```.env 
# Application
APP_PORT=3000
APP_NAME="PEOPayGo API"
APP_DESCRIPTION="Unnamed"

DB_URL=${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}

# JWT
JWT_SECRET=secret

# NextJs frontend envs
SECRET="secret"
NEXT_PUBLIC_APP_NAME=${APP_NAME}
NEXT_PUBLIC_APP_DESCRIPTION=${APP_DESCRIPTION}
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

1. Install all dependencies:

    ```bash  
    yarn install  
    ```  
2. Install Nx CLI

    ```bash  
    npm i --g nx@latest  
    ```  
3. Run the following commands depending on what you want to do:
   ```bash
   # run the API and frontend development servers
   yarn api:dev
   yarn frontend:dev
   
   # build the API and frontend
   yarn api:build
   yarn frontend:build
   
   # run tests
   yarn api:test
   yarn frontend:test
   
   # run tests with coverage
   yarn api:test-cov
   yarn frontend:test-cov
   
   #run e2e tests
   yarn api:e2e
   yarn frontend:e2e
   ```

   # Rum th efollowing commands dependending on what you want to do:
   ```bash
   run e2e tests
   yarn api:e2e
   yarn frontend:e2e
   ```

## Docs
To see api Docs go to: `https//{your_api_host}/api/docs`. example `https://localhost:3000/api/docs`
### Data Model
https://dbdiagram.io/d/65ccddafac844320ae244a77
![image](https://github.com/luisFelipeEvilla/nestjs-interview/assets/35440641/c089571a-b590-496c-946b-646b1e5690be)


