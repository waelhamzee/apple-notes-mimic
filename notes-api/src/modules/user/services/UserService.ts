import userRepository from '../repositories/UserRepository';
import { UserResponseDto } from '../dtos';
import { UnauthorizedError, NotFoundError } from '@/shared/errors';

export class UserService {
  async getProfile(userId: number): Promise<UserResponseDto> {
    if (!userId) {
      throw new UnauthorizedError('User not authenticated');
    }
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export default new UserService(); 