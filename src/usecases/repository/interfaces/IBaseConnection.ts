export interface IBaseConnection {
  createConnection(): any;
  runMigrations(): void;
  obtainConnection():any;
}
