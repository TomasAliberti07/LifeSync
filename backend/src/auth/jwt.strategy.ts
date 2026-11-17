import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'lifesync_secreto_super_seguro_2026',
    });
  }

  async validate(payload: { sub: number; usuario: string }) {
    // Lo que retornemos aquí se inyectará automáticamente en el objeto `request.user` de los controladores
    return { userId: payload.sub, usuario: payload.usuario };
  }
}