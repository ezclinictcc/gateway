export interface IUserRepository<UserEntity> {
  findById(id: string): Promise<UserEntity[]>;
  find(user: UserEntity): Promise<UserEntity[]>;
  add(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}
