import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(phone: string): Promise<Users | null> {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) {
      throw new NotFoundException(`User avec numero: ${phone} introuvable`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User avec email: ${email} introuvable`);
    }
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<Users> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User avec id: ${id} introuvable`);
    }
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}