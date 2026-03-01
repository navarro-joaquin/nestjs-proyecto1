import { Module } from '@nestjs/common';
import { GatosModule } from './gatos/gatos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazasModule } from './razas/razas.module';
import { VacunasModule } from './vacunas/vacunas.module';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get<boolean>('POSTGRES_SSL') === true,
        extra: {
          ssl: configService.get<boolean>('POSTGRES_SSL') === true ? {
            rejectUnauthorized: false
          } : null
        }
      }),
      inject: [ConfigService],
    }),
    GatosModule,
    RazasModule,
    VacunasModule,
    EmployeesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
