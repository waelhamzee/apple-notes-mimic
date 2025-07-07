import User from "../models/User";

export class UserRepository {
  async create(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    return await User.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

export default new UserRepository();
