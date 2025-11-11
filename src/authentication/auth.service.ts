import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/user.dto';
import { Users, UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  private pendingSignups = new Map<string, { dto: CreateUserDto; otp: string; expires: Date }>();

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    // Vérifie si un utilisateur existe déjà avec cet email
    try {
      await this.userService.findOne(createUserDto.email);
      throw new ConflictException('Adresse e-mail déjà utilisée');
    } catch (err) {
      if (!(err instanceof NotFoundException)) throw err;
    }

    if (!createUserDto.role || ![UserRole.PARENT, UserRole.ELEVE, UserRole.PROFESSEURS].includes(createUserDto.role)) {
      createUserDto.role = UserRole.PARENT;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000);
    this.pendingSignups.set(createUserDto.email, { dto: createUserDto, otp, expires });
    // Envoi du code OTP par e-mail (à implémenter)
    console.log(`OTP pour ${createUserDto.email} : ${otp}`);
    return { message: 'Vérifiez votre boîte mail pour le code OTP.' };
  }

  async verifyOtp(email: string, otp: string) {
    const pending = this.pendingSignups.get(email);
    if (!pending || pending.otp !== otp || pending.expires < new Date()) {
      throw new UnauthorizedException('OTP invalide ou expiré');
    }

    const hashedPassword = await bcrypt.hash(pending.dto.password, 10);
    let user: Users;
    try {
      user = await this.userService.createUser({
        ...pending.dto,
        password: hashedPassword,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Adresse e-mail déjà utilisée');
      }
      throw error;
    }

    this.pendingSignups.delete(email);
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token, user };
  }

  async resendOtp(email: string) {
    const pending = this.pendingSignups.get(email);
    if (!pending) {
      throw new UnauthorizedException('Aucune inscription en attente pour cet e-mail');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000);
    pending.otp = otp;
    pending.expires = expires;
    this.pendingSignups.set(email, pending);
    // Envoi de l’OTP par e-mail (à implémenter)
    console.log(`Nouvel OTP pour ${email} : ${otp}`);
    return { message: 'Nouveau code OTP envoyé.' };
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException('Aucun utilisateur avec cet e-mail');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000);
    this.pendingSignups.set(email, { dto: { ...user, password: '' }, otp, expires });
    // Envoi de l’OTP par e-mail (à implémenter)
    console.log(`OTP reset pour ${email} : ${otp}`);
    return { message: 'Un code OTP a été envoyé pour réinitialiser le mot de passe.' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const pending = this.pendingSignups.get(email);
    if (!pending || pending.otp !== otp || pending.expires < new Date()) {
      throw new UnauthorizedException('OTP invalide ou expiré');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(pending.dto.id, { password: hashedPassword });
    this.pendingSignups.delete(email);
    return { message: 'Mot de passe réinitialisé avec succès.' };
  }
}
