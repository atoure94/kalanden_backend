// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/user.dto';
import { Users, UserRole } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';

type PendingSignup = { dto: CreateUserDto; otp: string; expires: Date };
type PendingReset = { userId: number; otp: string; expires: Date };

@Injectable()
export class AuthService {
  private pendingSignups = new Map<string, PendingSignup>();
  private pendingResets = new Map<string, PendingReset>();
  private otpTTLms = 5 * 60 * 1000; // 5 minutes

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private signToken(user: Users) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.signAsync(payload);
  }

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const access_token = await this.signToken(user);
    return { access_token, user };
  }

  private genOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async signup(dto: CreateUserDto) {
    // Check existing user by email
    try {
      await this.userService.findOneByEmail(dto.email);
      // if found, conflict
      throw new ConflictException('Adresse e-mail déjà utilisée');
    } catch (err) {
      if (!(err instanceof NotFoundException)) throw err;
      // Not found => proceed
    }

    // ensure role is valid (default to parent)
    if (!dto.role || ![UserRole.PARENT, UserRole.ELEVE, UserRole.PROFESSEURS].includes(dto.role)) {
      dto.role = UserRole.PARENT;
    }

    const otp = this.genOtp();
    const expires = new Date(Date.now() + this.otpTTLms);
    // store DTO as-is (password plain) — we will hash at verification
    this.pendingSignups.set(dto.email, { dto, otp, expires });

    // TODO: send OTP by email (nodemailer / provider)
    console.log(`[AUTH] Signup OTP for ${dto.email}: ${otp} (expires ${expires.toISOString()})`);

    return { message: 'Un code OTP a été envoyé à l’adresse e-mail fournie.' };
  }

  async verifyOtp(email: string, otp: string) {
    const pending = this.pendingSignups.get(email);
    if (!pending) throw new UnauthorizedException('Aucune inscription en attente pour cet e-mail');
    if (pending.otp !== otp) throw new UnauthorizedException('OTP invalide');
    if (pending.expires < new Date()) {
      this.pendingSignups.delete(email);
      throw new UnauthorizedException('OTP expiré');
    }

    // hash password and create user
    const hashedPassword = await bcrypt.hash(pending.dto.password, 10);
    let user: Users;
    try {
      user = await this.userService.createUser({
        ...pending.dto,
        password: hashedPassword,
      });
    } catch (error: any) {
      // unique violation handling (Postgres code 23505)
      if (error?.code === '23505') {
        throw new ConflictException('Adresse e-mail déjà utilisée');
      }
      throw error;
    }

    this.pendingSignups.delete(email);
    const access_token = await this.signToken(user);
    return { access_token, user };
  }

  async resendOtp(email: string) {
    const pending = this.pendingSignups.get(email);
    if (!pending) throw new NotFoundException('Aucune inscription en attente pour cet e-mail');
    const otp = this.genOtp();
    pending.otp = otp;
    pending.expires = new Date(Date.now() + this.otpTTLms);
    this.pendingSignups.set(email, pending);
    // TODO: send OTP by email
    console.log(`[AUTH] Resend OTP for ${email}: ${otp}`);
    return { message: 'Nouveau code OTP envoyé.' };
  }

  /* ---------- Forgot / Reset password flow ---------- */

  async forgotPassword(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException('Aucun utilisateur avec cet e-mail');

    const otp = this.genOtp();
    const expires = new Date(Date.now() + this.otpTTLms);
    this.pendingResets.set(email, { userId: user.id, otp, expires });

    // TODO: send OTP by email
    console.log(`[AUTH] Password reset OTP for ${email}: ${otp}`);
    return { message: 'Un code OTP a été envoyé pour réinitialiser le mot de passe.' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const pending = this.pendingResets.get(email);
    if (!pending) throw new UnauthorizedException('Aucune demande de réinitialisation en attente pour cet e-mail');
    if (pending.otp !== otp) throw new UnauthorizedException('OTP invalide');
    if (pending.expires < new Date()) {
      this.pendingResets.delete(email);
      throw new UnauthorizedException('OTP expiré');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(pending.userId, { password: hashedPassword } as any);
    this.pendingResets.delete(email);
    return { message: 'Mot de passe réinitialisé avec succès.' };
  }
}
