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
    return this.userRepository.find({
      relations: ['students', 'teachers'],
    });
  }

  async findOneByPhone(phone: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { phone },
      relations: ['students', 'teachers'],
    });

    if (!user) {
      throw new NotFoundException(`User avec numéro ${phone} introuvable`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<Users> {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) throw new NotFoundException(`User avec email ${email} introuvable`);
  return user;
}


  createUser(data: CreateUserDto): Promise<Users> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User avec id ${id} introuvable`);
    }

    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User avec id ${id} introuvable`);
    }
  }
}
