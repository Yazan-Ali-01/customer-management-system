import { AppDataSource } from './ormconfig';

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    console.log('Migrations are successfully executed.');
  })
  .catch(error => {
    console.error('Error during migration run:', error);
  });
