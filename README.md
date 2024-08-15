Database: PostgreSQL database
ORM Used: Prisma
    to initialize - npx prisma init 
    prisma.schema for PostgreSQL database setup 
    tables are called models in Prisma
Packages Used: 
    dependencies: npm install express prisma @prisma/client dotenv jsonwebtoken cookie-parser bcryptjs 
    DevDependencies: npm install --save-dev @types/express nodemon ts-node typescript @types/bcryptjs @types/jsonwebtoken @types/cookie-parser


Steps in setting up the database
1. Create the model in the schema.prisma
2. run npx prisma db push
    Point to note: Whenever you make a change in the schema.prisma file run the command again so the prisma database would be updated as well.
3. 