import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // 1. Registro de nuevo usuario con contraseña hasheada
  async register(usuario: string, contrasena: string): Promise<UsuarioEntity> {
    const existe = await this.usuarioRepository.findOne({ where: { usuario } });
    if (existe) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Hashear la contraseña con bcrypt (10 rondas de salt)
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      usuario,
      contrasena: hashedPassword,
      estado: true,
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  // 2. Validación de credenciales para el Login
  async validateUser(usuario: string, contrasena: string): Promise<any> {
    const user = await this.usuarioRepository.findOne({ where: { usuario } });
    if (!user || !user.estado) {
      throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { contrasena: _, ...result } = user;
    return result;
  }

  // 3. Generación del Token JWT firmado
  async login(user: any) {
    const payload = { sub: user.id, usuario: user.usuario };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: user.usuario,
    };
  }
}