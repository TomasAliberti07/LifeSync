import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  usuario!: string;

  @Column({ type: 'varchar', length: 255 })
  contrasena!: string;

  @Column({ type: 'boolean', default: true })
  estado!: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  updatedAt!: Date;
}